import * as THREE from 'three';

function createStringMesh(scene: THREE.Scene) {
  const geometry = new THREE.CylinderGeometry(0.02, 0.02, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const string = new THREE.Mesh(geometry, material);
  scene.add(string);
  return string;
}

function createBallMesh(scene: THREE.Scene) {
  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const ball = new THREE.Mesh(geometry, material);
  scene.add(ball);
  return ball;
}

export class Pendulum {
  private string: THREE.Mesh;
  private ball: THREE.Mesh;
  frequency: number;

  constructor(scene: THREE.Scene) {
    const stringMesh = createStringMesh(scene);
    stringMesh.translateY(2);
    stringMesh.geometry.translate(0, -2, 0);
    this.string = stringMesh;

    const ballMesh = createBallMesh(scene);
    ballMesh.translateY(2);
    ballMesh.geometry.translate(0, -4.5, 0);
    this.ball = ballMesh;

    this.frequency = 0.002;
  }

  update(totalTime: number) {
    this.string.rotation.z = Math.cos(this.frequency * totalTime);
    this.ball.rotation.z = Math.cos(this.frequency * totalTime);
  }
}
