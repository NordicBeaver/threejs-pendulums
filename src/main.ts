import * as THREE from 'three';

const sceneCanvas = document.getElementById('sceneCanvas') as HTMLCanvasElement;
sceneCanvas.width = window.innerWidth;
sceneCanvas.height = 800;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 800, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas });

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

let lastFrameTime: number | null = null;
function animationFrame(time: number) {
  if (lastFrameTime == null) {
    lastFrameTime = time;
  } else {
    const deltaTime = time - lastFrameTime;
    lastFrameTime = time;
    update(deltaTime);
    renderer.render(scene, camera);
  }
  window.requestAnimationFrame(animationFrame);
}

function update(deltaTime: number) {
  const rotationSpeed = 0.001;
  cube.rotation.x += deltaTime * rotationSpeed;
  cube.rotation.y += deltaTime * rotationSpeed;
}

window.requestAnimationFrame(animationFrame);
