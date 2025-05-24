import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

function createProduct(scene) {
  // Table Top
  const tableMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3, roughness: 0.5, metalness: 0.2 });
  const tableTop = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 4), tableMaterial);
  tableTop.position.set(0, 0, 0);
  tableTop.userData = { partName: "Table" }; // ✅ Assign correct part name
  scene.add(tableTop);

  // Table Legs
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5, metalness: 0.2 });
  const legPositions = [
    { x: 1.8, z: 1.8 }, { x: -1.8, z: 1.8 }, 
    { x: -1.8, z: -1.8 }, { x: 1.8, z: -1.8 }
  ];
  
  legPositions.forEach(pos => {
    const legGeo = new THREE.CylinderGeometry(0.1, 0.05, 2.5, 16);
    const leg = new THREE.Mesh(legGeo, legMaterial);
    leg.position.set(pos.x, -1.25, pos.z);
    leg.userData = { partName: "Leg" }; // ✅ Assign correct part name
    leg.castShadow = true;
    scene.add(leg);
  });

  // Flower Pot
  const potMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513, metalness: 0.1, roughness: 0.2, transparent: true, opacity: 0.3, side: THREE.DoubleSide
  });
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5, 12), potMaterial);
  pot.position.set(0, 0.7, 0);
  pot.userData = { partName: "Flower Pot" }; // ✅ Assign correct part name
  scene.add(pot);

  // Flower (Petals + Stem)
  function createFlower(positionX, positionZ) {
    const flowerCenter = new THREE.Object3D();
    flowerCenter.position.set(positionX, 1.9, positionZ);
    flowerCenter.userData = { partName: "Flower" }; // ✅ Assign correct part name

    const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    for (let i = 0; i < 8; i++) {
      const petal = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.2, 8), petalMaterial);
      petal.position.set(Math.cos((i / 8) * Math.PI * 2) * 0.2, -0.4, Math.sin((i / 8) * Math.PI * 2) * 0.2);
      petal.rotation.set(Math.PI / 2, (i / 8) * Math.PI * 2, Math.PI / 4);
      flowerCenter.add(petal);
    }

    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.6, 12), stemMaterial);
    stem.position.y = -1.2;
    flowerCenter.add(stem);

    scene.add(flowerCenter);
  }

  // Generate multiple flowers inside the pot
  for (let i = 0; i < 30; i++) {
    const angle = (i / 30) * Math.PI * 2;
    createFlower(Math.cos(angle) * 0.1, Math.sin(angle) * 0.1);
  }
}

export { createProduct };