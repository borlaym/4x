import * as THREE from 'three';
import { uniq } from 'lodash'
import createStarBackground from 'createStarBackground';
import createPlanets from 'createPlanets';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.y = 1000;
camera.position.z = 1000;
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
	mousePos: {
		x: number,
		y: number
	}
};

const state: InterfaceState = {
	keysDown: [],
	mousePos: {
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
	state.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1
	state.mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;
};
document.addEventListener("mousemove", onMouseMove, false);


document.addEventListener('click', (event) => {
	const mouseRaycaster = new THREE.Raycaster();
	mouseRaycaster.setFromCamera(state.mousePos, camera)
	const intersects = mouseRaycaster.intersectObjects(planets.map(planet => planet.object))
	if (intersects.length === 1) {
		const intersection = intersects[0]
		const uuid = intersection.object.uuid
		const planet = planets.find(planet => planet.object.uuid === uuid)
		console.log(planet)
	}
});

const SPEED = 5

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

	camera.position.add(motion)

	planets.forEach(planet => planet.update())

	requestAnimationFrame(update);
	renderer.render(scene, camera);

}


update()