import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { scene, camera, renderer } from './initScene.js';

let radius = 5;
let theta = 0;
let phi = Math.PI / 2;
const clock = new THREE.Clock();
const autoRotateSpeed = 0.2;

// Mouse interaction variables
let isMouseDown = false;
let lastMouseX = 0;
let lastMouseY = 0;

function updateCamera() {
  camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
  camera.position.y = radius * Math.cos(phi);
  camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(scene.position);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  theta += autoRotateSpeed * delta;
  updateCamera();
  renderer.render(scene, camera);
}
animate();

// Mouse controls for orbiting
document.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    theta -= deltaX * 0.005;
    phi -= deltaY * 0.005;

    // Prevent camera from flipping upside down
    const epsilon = 0.01;
    phi = Math.max(epsilon, Math.min(Math.PI - epsilon, phi));

    updateCamera();
  }
});

export { animate };