import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

function addLighting(scene) {
  // Ambient Light (Soft Global Illumination)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Increased intensity
  scene.add(ambientLight);

  // Directional Light (Adds shadows and highlights)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(-10, 15, 5);
  dirLight.castShadow = true;
  
  // Soften shadows for a better appearance
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 30;

  scene.add(dirLight);

  // Spotlight for a more dramatic effect
  const spotlight = new THREE.SpotLight(0xffe08a, 2.5); // Warm, glowing effect
  spotlight.position.set(0, 10, 0);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 6;
  spotlight.penumbra = 0.5;
  spotlight.decay = 2;
  spotlight.distance = 20;
  
  scene.add(spotlight);
}

export { addLighting };