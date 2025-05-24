import { addLighting } from './addLighting.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  90, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enables smoother rendering
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xDADADA);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ensure responsiveness when window resizes
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add lighting to the scene
addLighting(scene);

export { scene, camera, renderer };