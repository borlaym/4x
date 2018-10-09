import Building from "./Building";
import { Vector3, Euler } from "three";
import rotateAroundPoint from "rotateAroundPoint";
import PlanetMesh from "PlanetMesh";
import Tile from "./Tile";

const rotationAxis = new Vector3(0, 1, 0)

/**
 * Slow down planet rotation, since it has no gameplay effect anyway
 */
const ROTATION_CONSTANT = 0.1
export const DISTANCE_CONSTANT = 4

export default class Planet {
	public readonly position: Vector3
	public readonly rotation: Euler
	public readonly buildings: Building[]
	public readonly mesh: PlanetMesh
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
		startingRotation: number,
		public readonly tiles: Tile[][]
	){
		this.position = new Vector3(distanceFromSun * DISTANCE_CONSTANT, 0, 0)
		// Here I'm reusing the starting rotation as both the position around the sun and the planet's local rotation
		rotateAroundPoint(this.position, this.orbitsAround, rotationAxis, startingRotation)
		this.rotation = new Euler(0, startingRotation, 0)
		this.mesh = new PlanetMesh(name, `textures/${name.toLowerCase()}.jpg`, diameter, this)
	}

	public update(dDays: number) {
		const theta = (dDays / this.orbitalPeriod) * (Math.PI * 2)
		rotateAroundPoint(this.position, this.orbitsAround, rotationAxis, theta)
		this.rotation.y += ((dDays * 24) / this.rotationPeriod) * (Math.PI * 2) * ROTATION_CONSTANT
	}
}