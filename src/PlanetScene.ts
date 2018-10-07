import { Camera, Vector3 } from "three";
import * as THREE from "three";
import PlanetMesh from "PlanetMesh";
import GameScene from "./GameScene";
import GameState from "GameState";

const cameraDistance = (diameter: number) => diameter * 2

export default class PlanetScene implements GameScene {
	public readonly scene: THREE.Scene
	public readonly camera: Camera
	public readonly name: string = 'PlanetScene'
	public readonly planet: PlanetMesh
	constructor(planet: PlanetMesh) {
		this.scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.position.set(planet.mesh.position.x, planet.mesh.position.y, planet.mesh.position.z);
		camera.position.add(new Vector3(0, cameraDistance(planet.diameter), 0))
		this.camera = camera

		this.scene.add(planet.mesh)
		this.camera.lookAt(planet.mesh.position)

		this.planet = planet
	}

	public onShow() {
		return false
	}

	public onClick(state: GameState, callback: (planet?: PlanetMesh) => void) {
		callback()
	}
	
	public update(state: GameState) {
		this.camera.position.set(this.planet.mesh.position.x, this.planet.mesh.position.y, this.planet.mesh.position.z);
		this.camera.position.add(new Vector3(0, 0, cameraDistance(this.planet.diameter)))
		this.camera.lookAt(this.planet.mesh.position)		
	}
}