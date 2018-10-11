import { Mesh } from "three";
import * as THREE from "three";
import Planet from "models/Planet";
import GameObject from "GameObject";

export default class PlanetMesh extends GameObject {
	public mesh: Mesh
	constructor(
		public readonly name: string,
		public readonly textureFile: string,
		public readonly diameter: number,
		private readonly model: Planet
	) {
		super(diameter * 3)
		const planetGeometry = new THREE.SphereGeometry(this.diameter, 32, 32);
		const planetTexture = new THREE.TextureLoader().load(this.textureFile);
		const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: planetTexture });
		const planet = new THREE.Mesh(planetGeometry, planetMaterial);
		this.mesh = planet

		this.drawNameplate()
		this.init()
	}

	public update() {
		super.update()
		this.mesh.position.set(this.model.position.x, this.model.position.y, this.model.position.z)
		this.mesh.rotation.y = this.model.rotation.y
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
		ctx.fillText(this.model.name, 64, 0);
	}
}