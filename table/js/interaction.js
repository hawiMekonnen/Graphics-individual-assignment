import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { scene, camera } from './initScene.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let selectedObject = null; // Stores the selected object
const infoPanel = document.createElement("div");
infoPanel.style.position = "absolute";
infoPanel.style.bottom = "20px";
infoPanel.style.left = "50%";
infoPanel.style.transform = "translateX(-50%)";
infoPanel.style.background = "rgba(0,0,0,0.7)";
infoPanel.style.color = "#fff";
infoPanel.style.padding = "8px 12px";
infoPanel.style.borderRadius = "4px";
infoPanel.style.display = "none";
infoPanel.style.fontSize = "14px";
document.body.appendChild(infoPanel);

// Function to handle object selection
function handleClick(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;

  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const intersected = intersects[0].object;

    // Reset previous selection
    if (selectedObject) {
      selectedObject.scale.set(1, 1, 1);
      if (selectedObject.material) {
        selectedObject.material.emissive = new THREE.Color(0, 0, 0);
      }
    }

    // Highlight clicked object
    selectedObject = intersected;
    selectedObject.scale.set(1.2, 1.2, 1.2); // Brief scale-up effect
    if (selectedObject.material) {
      selectedObject.material.emissive = new THREE.Color(0x222222);
    }

    // Display correct part names
    let partName = selectedObject.userData.partName || "Unknown Part";

    infoPanel.textContent = partName;
    infoPanel.style.display = "block";

    // Hide panel after 2 seconds & reset scale
    clearTimeout(infoPanel.timeout);
    infoPanel.timeout = setTimeout(() => {
      infoPanel.style.display = "none";
      if (selectedObject) {
        selectedObject.scale.set(1, 1, 1);
        if (selectedObject.material) {
          selectedObject.material.emissive = new THREE.Color(0, 0, 0);
        }
        selectedObject = null;
      }
    }, 2000);
  } else {
    // No hit: hide panel
    infoPanel.style.display = "none";
    if (selectedObject) {
      selectedObject.scale.set(1, 1, 1);
      if (selectedObject.material) {
        selectedObject.material.emissive = new THREE.Color(0, 0, 0);
      }
      selectedObject = null;
    }
  }
}

// Add both **click** and **touch** event listeners
document.addEventListener("click", handleClick);
document.addEventListener("touchstart", handleClick);

export { raycaster };