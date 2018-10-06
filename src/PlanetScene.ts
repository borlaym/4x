import { Camera, Vector3 } from "three";
import * as THREE from "three";
import Planet from "./Planet";
import GameScene from "./GameScene";
import GameState from "GameState";

const cameraDistance = (diameter: number) => diameter * 2

export default class PlanetScene implements GameScene {
	public readonly scene: THREE.Scene
	public readonly camera: Camera
	public readonly name: string = 'PlanetScene'
	public readonly planet: Planet
	constructor(planet: Planet) {
		this.scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.position.set(planet.object.position.x, planet.object.position.y, planet.object.position.z);
		camera.position.add(new Vector3(0, cameraDistance(planet.diameter), 0))
		this.camera = camera

		this.scene.add(planet.object)
		this.camera.lookAt(planet.object.position)

		this.planet = planet
	}

	public onShow() {
		return false
	}

	public onClick(state: GameState, callback: (planet?: Planet) => void) {
		callback()
	}
	
	public update(state: GameState) {
		this.camera.position.set(this.planet.object.position.x, this.planet.object.position.y, this.planet.object.position.z);
		this.camera.position.add(new Vector3(0, 0, cameraDistance(this.planet.diameter)))
		this.camera.lookAt(this.planet.object.position)		
	}
}