import * as THREE from 'three';
import { uniq } from 'lodash'
import GameState from 'GameState';
import SystemScene from 'SystemScene';
import UI from 'components/UI';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Planet from './models/Planet';
import Company, { CompanyColor } from 'models/Company';
import EventBus from 'EventBus';
import Ship from 'models/Ship';
import createPlanets from 'createPlanets';

const SPEED1 = 0.5
const SPEED2 = 1
const SPEED3 = 3
let lastUpdate = Date.now()

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planets = createPlanets()
const company = new Company('Player', CompanyColor.Red)

const ship = new Ship(planets[2])
ship.goToPlanet(planets[1])

const state: GameState = {
	keysDown: [],
	mousePos: {
		x: 0,
		y: 0
	},
	days: 0,
	speed: SPEED1,
	activeScene: null,
	company,
	ships: [ship],
	planets
};

console.log(state)

const systemScene = new SystemScene(state)
state.activeScene = systemScene
systemScene.scene.add(ship.mesh.mesh)

document.addEventListener('keydown', (event) => {
	state.keysDown = uniq(state.keysDown.concat(event.key));
});

document.addEventListener('keyup', (event) => {
	state.keysDown = state.keysDown.filter(key => key !== event.key);
});

window.addEventListener('wheel', (event) => {
	event.preventDefault()
	state.activeScene && state.activeScene.onWheel(event)
}, false);

document.addEventListener('click', () => {
	state.activeScene && state.activeScene.onClick(state, (planet?: Planet) => {
		return null
	})
});

const onMouseMove = (event: MouseEvent) => {
	state.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1
	state.mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;
};
document.addEventListener("mousemove", onMouseMove, false);

function update() {
	const now = Date.now()
	const dt = now - lastUpdate
	lastUpdate = now

	// Update game time
	const dDays = dt / 1000 * state.speed
	state.days += dDays

	// Update models
	state.planets.forEach(planet => planet.update(dDays))
	state.planets.forEach(planet => planet.mesh.update())
	state.activeScene && state.activeScene.update(state)
	ship.update(dDays)
	ship.mesh.update()
	state.activeScene && renderer.render(state.activeScene.scene, state.activeScene.camera);
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

EventBus.on('SET_SPEED_1', () => { state.speed = SPEED1 })
EventBus.on('SET_SPEED_2', () => { state.speed = SPEED2 })
EventBus.on('SET_SPEED_3', () => { state.speed = SPEED3 })