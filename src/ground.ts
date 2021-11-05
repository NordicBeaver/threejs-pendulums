import * as THREE from 'three';

import woodTextureColorPath from 'url:./public/wood_color.jpg';
import woodTextureRoughnessPath from 'url:./public/wood_roughness.jpg';
import woodTextureNormalPath from 'url:./public/wood_normal.jpg';

export async function createGround() {
  const loader = new THREE.TextureLoader();

  const woodTextureColor = await loader.loadAsync(woodTextureColorPath);
  woodTextureColor.wrapS = THREE.RepeatWrapping;
  woodTextureColor.wrapT = THREE.RepeatWrapping;
  woodTextureColor.repeat.set(100, 10);

  const woodTextureRoughness = await loader.loadAsync(woodTextureRoughnessPath);
  woodTextureRoughness.wrapS = THREE.RepeatWrapping;
  woodTextureRoughness.wrapT = THREE.RepeatWrapping;
  woodTextureRoughness.repeat.set(100, 10);

  const woodTextureNormal = await loader.loadAsync(woodTextureNormalPath);
  woodTextureNormal.wrapS = THREE.RepeatWrapping;
  woodTextureNormal.wrapT = THREE.RepeatWrapping;
  woodTextureNormal.repeat.set(100, 10);

  const planeGeometry = new THREE.PlaneGeometry(1000, 100);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: woodTextureColor,
    normalMap: woodTextureNormal,
    normalScale: new THREE.Vector2(5, 5),
    roughness: 1,
    roughnessMap: woodTextureRoughness,
  });
  const mesh = new THREE.Mesh(planeGeometry, planeMaterial);

  mesh.receiveShadow = true;
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -5;

  return mesh;
}
