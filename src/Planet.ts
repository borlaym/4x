import { Mesh } from "three";
import * as THREE from "three";

export default class Planet {
	public object: Mesh
	constructor(
		public readonly name: string,
		public readonly textureFile: string,
		public readonly diameter: number,
		public readonly distanceFromSun: number,
		public readonly orbitalPeriod: number
	) {
		const planetGeometry = new THREE.SphereGeometry(this.diameter, 32, 32);
		const planetTexture = new THREE.TextureLoader().load(this.textureFile);
		const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: planetTexture });
		const planet = new THREE.Mesh(planetGeometry, planetMaterial);
		planet.position.x = this.distanceFromSun * 4
		this.object = planet

	}
}