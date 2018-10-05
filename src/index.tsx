import * as THREE from 'three';
import { uniq } from 'lodash'
import createStarBackground from 'createStarBackground';
import createPlanets from 'createPlanets';
import rotateAroundPoint from 'rotateAroundPoint';
import { Vector3 } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.y = 200;
camera.position.z = 200;
camera.rotation.x = -Math.PI / 4

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(59, 32, 32);
const sunMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

scene.add(sun)

const planets = createPlanets()
planets.forEach(planet => scene.add(planet.object))

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


const SPEED = 5
const center = new Vector3()
const rotationAxis = new Vector3(0, 1, 0)

function update() {
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

	state.mouseMovement.x = 0;
	state.mouseMovement.y = 0;

	camera.position.add(motion)

	// rotate around the sun and axis
	planets.forEach(planet => {
		const theta = 1 / planet.orbitalPeriod
		rotateAroundPoint(planet.object, center, rotationAxis, theta)
	})


	requestAnimationFrame(update);
	renderer.render(scene, camera);

}


update()