import { Mesh } from "three";
import * as THREE from "three";
import Planet from "models/Planet";

export default class PlanetMesh {
	public mesh: Mesh
	public collider: Mesh
	public isHighlighted: boolean = false
	public namePlate: THREE.Sprite
	private canvas: HTMLCanvasElement
	constructor(
		public readonly name: string,
		public readonly textureFile: string,
		public readonly diameter: number,
		private readonly model: Planet
	) {
		const planetGeometry = new THREE.SphereGeometry(this.diameter, 32, 32);
		const planetTexture = new THREE.TextureLoader().load(this.textureFile);
		const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: planetTexture });
		const planet = new THREE.Mesh(planetGeometry, planetMaterial);
		this.mesh = planet

		const colliderDimensions = Math.max(36, this.diameter * 3)
		const colliderBox = new THREE.BoxGeometry(colliderDimensions, colliderDimensions, colliderDimensions, 1, 1, 1)
		const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false })
		this.collider = new THREE.Mesh(colliderBox, colliderMaterial)

		this.drawNameplate()
		const namePlateTexture = new THREE.CanvasTexture(this.canvas)
		const namePlateMaterial = new THREE.SpriteMaterial({
			map: namePlateTexture,
			color: 0xffffff
		})
		this.namePlate = new THREE.Sprite(namePlateMaterial)
		this.namePlate.scale.x = 64
		this.namePlate.scale.y = 32
	}

	public update() {
		this.mesh.position.set(this.model.position.x, this.model.position.y, this.model.position.z)
		this.collider.position.set(this.model.position.x, this.model.position.y, this.model.position.z)
		this.namePlate.position.set(this.model.position.x, this.model.diameter * 1.5, this.model.position.z)
		this.mesh.rotation.y = this.model.rotation.y
	}

	private drawNameplate() {
		const canvas = document.createElement('canvas')
		canvas.width = 128
		canvas.height = 64
		const ctx = canvas.getContext('2d')
		if (!ctx) {
			throw new Error('cant init canvas')
		}
		ctx.fillStyle = "white"
		ctx.textAlign = "center"
		ctx.textBaseline = "top"
		ctx.font = "20px sans-serif";
		ctx.fillText(this.model.name, 64, 0);
		this.canvas = canvas
	}
}