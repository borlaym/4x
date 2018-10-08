import { Mesh } from "three";
import * as THREE from "three";
import Planet from "models/Planet";

export default class PlanetMesh {
	public mesh: Mesh
	public collider: Mesh
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
	}

	public update() {
		this.mesh.position.set(this.model.position.x, this.model.position.y, this.model.position.z)
		this.collider.position.set(this.model.position.x, this.model.position.y, this.model.position.z)
		this.mesh.rotation.y = this.model.rotation.y
	}
}