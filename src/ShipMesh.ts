import { Mesh } from "three";
import * as THREE from "three";
import Ship from "models/Ship";

export default class ShipMesh {
	public mesh: Mesh
	constructor(
		private readonly model: Ship
	) {
		const shipGeometry = new THREE.BoxGeometry(4, 4, 4, 1, 1);
		const shipMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
		this.mesh = new THREE.Mesh(shipGeometry, shipMaterial);
	}

	public update() {
		this.mesh.position.set(this.model.position.x, this.model.position.y, this.model.position.z)
	}
}