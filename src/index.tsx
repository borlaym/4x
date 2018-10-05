import * as THREE from 'three';
import { uniq } from 'lodash'
import createPlanets from 'createPlanets';
import GameState from 'GameState';
import SystemScene from 'SystemScene';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planets = createPlanets()

const systemScene = new SystemScene(planets)
const state: GameState = {
	keysDown: [],
	mousePos: {
		x: 0,
		y: 0
	},
	activeScene: systemScene
};


document.addEventListener('keydown', (event) => {
	state.keysDown = uniq(state.keysDown.concat(event.key));
});

document.addEventListener('keyup', (event) => {
	state.keysDown = state.keysDown.filter(key => key !== event.key);
});

document.addEventListener('click', () => {
	state.activeScene.onClick(state)
});

const onMouseMove = (event: MouseEvent) => {
	state.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1
	state.mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;
};
document.addEventListener("mousemove", onMouseMove, false);

function update() {
	planets.forEach(planet => planet.update())

	renderer.render(state.activeScene.scene, state.activeScene.camera);
	requestAnimationFrame(update);

}


update()