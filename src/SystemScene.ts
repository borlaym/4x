import { Camera, Vector3 } from "three";
import * as THREE from "three";
import Planet, { DISTANCE_CONSTANT } from "./models/Planet";
import GameScene from "./GameScene";
import GameState from "GameState";
import createStarBackground from "./createStarBackground";

const CAMERA_SPEED = 5


export default class SystemScene implements GameScene{
	public readonly scene: THREE.Scene
	public readonly camera: Camera
	public readonly name: string = 'SystemScene'
	private readonly gameState: GameState
	constructor(gameState: GameState) {
		this.gameState = gameState
		this.scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100000);
		camera.position.y = 1000;
		camera.position.z = 1000;
		camera.rotation.x = -Math.PI / 4
		this.camera = camera

		const sunGeometry = new THREE.SphereGeometry(59, 32, 32);
		const sunMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xfff797 });
		const sun = new THREE.Mesh(sunGeometry, sunMaterial);
		this.scene.add(sun)

		 // Orbit circles
		 gameState.planets.forEach(planet => {
			const geometry = new THREE.CircleGeometry(
				planet.distanceFromSun * DISTANCE_CONSTANT,
				100
			);
			geometry.vertices.shift()
			const material = new THREE.LineBasicMaterial({ color: 0xaaaaaa });
			// @ts-ignore
			const mesh = new THREE.LineLoop(geometry, material);
			mesh.rotation.x = Math.PI / 2
			this.scene.add(mesh);
		})


		gameState.planets.forEach(planet => this.scene.add(planet.mesh.mesh))

		const starField = createStarBackground()
		this.scene.add(starField);
	}

	public onShow() {
		this.gameState.planets.forEach(planet => this.scene.add(planet.mesh.mesh))
	}

	public onClick(state: GameState, callback: (planet: Planet) => void) {
		const mouseRaycaster = new THREE.Raycaster();
		mouseRaycaster.setFromCamera(state.mousePos, this.camera)
		const intersects = mouseRaycaster.intersectObjects(this.gameState.planets.map(planet => planet.mesh.hitBox))
		if (intersects.length === 1) {
			const intersection = intersects[0]
			const uuid = intersection.object.uuid
			const planet = this.gameState.planets.find(planet => planet.mesh.hitBox.uuid === uuid)
			if (planet) {
				callback(planet)
			}
		}
	}

	public onWheel(event: MouseWheelEvent) {
		const cameraDirection = new Vector3()
		this.camera.getWorldDirection(cameraDirection)
		this.camera.position.add(cameraDirection.setLength(-event.deltaY))
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

		// Check for hover
		this.gameState.planets.forEach(planet => { planet.mesh.isHighlighted = false })
		this.gameState.ships.forEach(ship => { ship.mesh.isHighlighted = false })
		const mouseRaycaster = new THREE.Raycaster();
		mouseRaycaster.setFromCamera(state.mousePos, this.camera)
		const hitBoxes = this.gameState.planets.map(planet => planet.mesh.hitBox)
			.concat(this.gameState.ships.map(ship => ship.mesh.hitBox))
		const intersects = mouseRaycaster.intersectObjects(hitBoxes)

		if (intersects.length > 0) {
			const intersection = intersects[0]
			const uuid = intersection.object.uuid
			const planet = this.gameState.planets.find(planet => planet.mesh.hitBox.uuid === uuid)
			if (planet) {
				planet.mesh.isHighlighted = true
			} else {
				const ship = this.gameState.ships.find(ship => ship.mesh.hitBox.uuid === uuid)
				if (ship) {
					ship.mesh.isHighlighted = true
				}
			}
		}
	}
}