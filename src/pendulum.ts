import * as THREE from 'three';

function createStringMesh(scene: THREE.Scene) {
  const geometry = new THREE.CylinderGeometry(0.01, 0.01, 8);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0.2 });
  const string = new THREE.Mesh(geometry, material);
  string.castShadow = true;
  scene.add(string);
  return string;
}

function createBallMesh(scene: THREE.Scene) {
  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0.2 });
  const ball = new THREE.Mesh(geometry, material);
  ball.castShadow = true;
  scene.add(ball);
  return ball;
}

export class Pendulum {
  private string: THREE.Mesh;
  private ball: THREE.Mesh;
  frequency: number;
  amplitude: number;

  constructor(scene: THREE.Scene) {
    const stringMesh = createStringMesh(scene);
    stringMesh.translateY(6);
    stringMesh.geometry.translate(0, -4, 0);
    this.string = stringMesh;

    const ballMesh = createBallMesh(scene);
    ballMesh.translateY(6);
    ballMesh.geometry.translate(0, -8.5, 0);
    this.ball = ballMesh;

    this.frequency = 0.001;
    this.amplitude = 0.5;
  }

  update(totalTime: number) {
    this.string.rotation.z = this.amplitude * Math.cos(this.frequency * totalTime);
    this.ball.rotation.z = this.amplitude * Math.cos(this.frequency * totalTime);
  }
}
