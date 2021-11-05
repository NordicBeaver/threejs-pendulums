import * as THREE from 'three';

import marbleTextureColorPath from 'url:./public/marble_color.jpg';
import marbleTextureRoughnessPath from 'url:./public/marble_roughness.jpg';

function createStringMesh(scene: THREE.Scene) {
  const geometry = new THREE.CylinderGeometry(0.001, 0.001, 8);
  const material = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0, metalness: 0.2 });
  const string = new THREE.Mesh(geometry, material);
  scene.add(string);
  return string;
}

async function createBallMesh(scene: THREE.Scene) {
  const loader = new THREE.TextureLoader();

  const marbleTextureColor = await loader.loadAsync(marbleTextureColorPath);
  const marbleTextureRoughness = await loader.loadAsync(marbleTextureRoughnessPath);

  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshStandardMaterial({
    map: marbleTextureColor,
    roughness: 1,
    roughnessMap: marbleTextureRoughness,
    metalness: 0.2,
  });
  const ball = new THREE.Mesh(geometry, material);
  ball.castShadow = true;
  scene.add(ball);
  return ball;
}

class Pendulum {
  private string: THREE.Mesh;
  private ball: THREE.Mesh;
  frequency: number;
  amplitude: number;

  constructor(stringMesh: THREE.Mesh, ballMesh: THREE.Mesh, frequency: number, amplitude: number) {
    this.string = stringMesh;
    this.ball = ballMesh;
    this.frequency = frequency;
    this.amplitude = amplitude;
  }

  update(totalTime: number) {
    this.string.rotation.z = this.amplitude * Math.cos(this.frequency * totalTime);
    this.ball.rotation.z = this.amplitude * Math.cos(this.frequency * totalTime);
  }
}

export async function createPendulum(scene: THREE.Scene) {
  const stringMesh = createStringMesh(scene);
  stringMesh.translateY(6);
  stringMesh.geometry.translate(0, -4, 0);

  const ballMesh = await createBallMesh(scene);
  ballMesh.translateY(6);
  ballMesh.geometry.translate(0, -8.5, 0);

  const frequency = 0.001;
  const amplitude = 0.5;

  const pendulum = new Pendulum(stringMesh, ballMesh, frequency, amplitude);
  return pendulum;
}
