import { Mesh } from "three";
import * as THREE from "three";
import Ship from "models/Ship";
import GameObject from "GameObject";

export default class ShipMesh extends GameObject {
	public mesh: Mesh
	constructor(
		private readonly model: Ship
	) {
		super(8)
		const shipGeometry = new THREE.BoxGeometry(4, 4, 4, 1, 1);
		const shipMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
		this.mesh = new THREE.Mesh(shipGeometry, shipMaterial);
		this.drawNameplate()
		this.init()
	}

	public update() {
		super.update()
		this.mesh.position.set(this.model.position.x, this.model.position.y, this.model.position.z)
	}

	private drawNameplate() {
		const canvas = this.canvas
		const ctx = this.ctx
		canvas.width = 128
		canvas.height = 64
		ctx.fillStyle = "white"
		ctx.textAlign = "center"
		ctx.textBaseline = "top"
		ctx.font = "20px sans-serif";
		ctx.fillText('Ship 01', 64, 0);
	}
}