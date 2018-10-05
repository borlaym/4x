import * as THREE from 'three';
import { uniq } from 'lodash'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 4;
camera.rotation.x = -Math.PI / 2

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const texture = new THREE.TextureLoader().load('textures/earth.jpg');
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.lookAt(sphere.position)

interface InterfaceState {
	keysDown: string[],
	mouseMovement: {
		x: number,
		y: number
	}
};

const state: InterfaceState = {
	keysDown: [],
	mouseMovement: {
		x: 0,
		y: 0
	}
};

document.addEventListener('keydown', (event) => {
	state.keysDown = uniq(state.keysDown.concat(event.key));
});

document.addEventListener('keyup', (event) => {
	state.keysDown = state.keysDown.filter(key => key !== event.key);
});

const onMouseMove = (event: MouseEvent) => {
	state.mouseMovement.x += event.movementX;
	state.mouseMovement.y += event.movementY;
};
document.addEventListener("mousemove", onMouseMove, false);


const SPEED = 0.1

function animate() {
	const motion = new THREE.Vector3(0, 0, 0);
	if (state.keysDown.indexOf('w') > -1) {
		motion.z -= SPEED;
	}
	if (state.keysDown.indexOf('s') > -1) {
		motion.z += SPEED;
	}
	if (state.keysDown.indexOf('a') > -1) {
		motion.x -= SPEED;
	}
	if (state.keysDown.indexOf('d') > -1) {
		motion.x += SPEED;
	}
	// motion.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));

	state.mouseMovement.x = 0;
	state.mouseMovement.y = 0;


	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}


animate()