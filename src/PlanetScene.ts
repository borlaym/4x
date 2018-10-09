import { Camera, Vector3 } from "three";
import * as THREE from "three";
import Planet from "./models/Planet";
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
		camera.position.set(planet.mesh.mesh.position.x, planet.mesh.mesh.position.y, planet.mesh.mesh.position.z);
		camera.position.add(new Vector3(0, cameraDistance(planet.diameter), 0))
		this.camera = camera

		this.scene.add(planet.mesh.mesh)
		this.camera.lookAt(planet.mesh.mesh.position)

		this.planet = planet
	}

	public onShow() {
		return false
	}

	public onWheel() {
		return false
	}

	public onClick(state: GameState, callback: (planet?: Planet) => void) {
		callback()
	}
	
	public update(state: GameState) {
		this.camera.position.set(this.planet.mesh.mesh.position.x, this.planet.mesh.mesh.position.y, this.planet.mesh.mesh.position.z);
		this.camera.position.add(new Vector3(0, 0, cameraDistance(this.planet.diameter)))
		this.camera.lookAt(this.planet.mesh.mesh.position)		
	}
}