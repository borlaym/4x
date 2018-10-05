import * as THREE from 'three';
import { uniq } from 'lodash'
import createStarBackground from 'createStarBackground';
import createPlanets from 'createPlanets';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 4;
camera.rotation.x = -Math.PI / 2

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planets = createPlanets()
planets.forEach(planet => scene.add(planet))
camera.lookAt(planets[0].position)

const starField = createStarBackground()
scene.add(starField);

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

	camera.position.add(motion)


	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}


animate()