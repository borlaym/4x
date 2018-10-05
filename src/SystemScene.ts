import { Camera } from "three";
import * as THREE from "three";
import Planet from "./Planet";
import GameScene from "./GameScene";
import GameState from "GameState";
import createStarBackground from "./createStarBackground";

const CAMERA_SPEED = 5


export default class SystemScene implements GameScene{
	public readonly scene: THREE.Scene
	public readonly camera: Camera
	private readonly planets: Planet[]
	constructor(planets: Planet[]) {
		this.scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.position.y = 1000;
		camera.position.z = 1000;
		camera.rotation.x = -Math.PI / 4
		this.camera = camera

		const sunGeometry = new THREE.SphereGeometry(59, 32, 32);
		const sunMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xffff00 });
		const sun = new THREE.Mesh(sunGeometry, sunMaterial);

		this.scene.add(sun)
		planets.forEach(planet => this.scene.add(planet.object))

		const starField = createStarBackground()
		this.scene.add(starField);

		this.planets = planets
	}

	public onShow() {
		this.planets.forEach(planet => this.scene.add(planet.object))
	}

	public onClick(state: GameState, callback: (planet: Planet) => void) {
		const mouseRaycaster = new THREE.Raycaster();
		mouseRaycaster.setFromCamera(state.mousePos, this.camera)
		const intersects = mouseRaycaster.intersectObjects(this.planets.map(planet => planet.object))
		if (intersects.length === 1) {
			const intersection = intersects[0]
			const uuid = intersection.object.uuid
			const planet = this.planets.find(planet => planet.object.uuid === uuid)
			if (planet) {
				callback(planet)
			}
		}
	}

	public update(state: GameState) {
		const motion = new THREE.Vector3(0, 0, 0);
		if (state.keysDown.indexOf('w') > -1) {
			motion.z -= CAMERA_SPEED;
		}
		if (state.keysDown.indexOf('s') > -1) {
			motion.z += CAMERA_SPEED;
		}
		if (state.keysDown.indexOf('a') > -1) {
			motion.x -= CAMERA_SPEED;
		}
		if (state.keysDown.indexOf('d') > -1) {
			motion.x += CAMERA_SPEED;
		}

		this.camera.position.add(motion)
	}
}