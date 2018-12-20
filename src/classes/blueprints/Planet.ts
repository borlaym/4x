import GameObject from "classes/GameObject";
import Transform from "classes/components/Transform";
import Rendering from "classes/components/Rendering";
import { Vector3 } from "three";
import * as THREE from "three";
import Tile from "models/Tile";
import Orbit from "classes/components/Orbit";
import Rotation from "classes/components/Rotation";

export const DISTANCE_CONSTANT = 4

export default class Planet extends GameObject {
	constructor(
		public readonly name: string,
		public readonly diameter: number,
		public readonly distanceFromSun: number,
		/**
		 * Number of days it takes for the planet to complete a full orbit
		 */
		public readonly orbitalPeriod: number,
		/**
		 * Number of hours it takes the planet to rotate around its axis
		 */
		public readonly rotationPeriod: number,
		public readonly orbitsAround: Vector3 = new Vector3(),
		public readonly tiles: Tile[][]
	) {
		super();
		this.getComponent(Transform).position.set(distanceFromSun * DISTANCE_CONSTANT, 0, 0);

		const planetGeometry = new THREE.SphereGeometry(diameter, 32, 32);
		const planetTexture = new THREE.TextureLoader().load(`textures/${name.toLowerCase()}.jpg`);
		const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: planetTexture });
		const mesh = new THREE.Mesh(planetGeometry, planetMaterial);

		this.addComponent(new Rendering(mesh))
		this.addComponent(new Orbit(orbitalPeriod, orbitsAround));
		this.addComponent(new Rotation(rotationPeriod))
	}
}