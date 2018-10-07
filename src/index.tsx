import * as THREE from 'three';
import { uniq } from 'lodash'
import GameState from 'GameState';
import SystemScene from 'SystemScene';
import PlanetScene from 'PlanetScene';
import UI from 'components/UI';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import PlanetController from 'controllers/PlanetController';
import Planet from './models/Planet';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planetController = new PlanetController()
console.log(planetController)

const systemScene = new SystemScene(planetController.planets)
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
	state.activeScene.onClick(state, (planet?: Planet) => {
		if (planet) {
			const planetScene = new PlanetScene(planet)
			state.activeScene = planetScene
		} else {
			state.activeScene = systemScene
		}

		state.activeScene.onShow()
	})
});

const onMouseMove = (event: MouseEvent) => {
	state.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1
	state.mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;
};
document.addEventListener("mousemove", onMouseMove, false);

function update() {
	planetController.planets.forEach(planet => planet.update())
	planetController.planets.forEach(planet => planet.mesh.update())
	state.activeScene.update(state)
	renderer.render(state.activeScene.scene, state.activeScene.camera);
	renderUI(state)
	requestAnimationFrame(update);
}

const reactRoot = document.createElement('div')
document.body.appendChild(reactRoot)

update()


function renderUI(gameState: GameState) {
	ReactDOM.render(
		<UI gameState={gameState} />,
		reactRoot
	)
}