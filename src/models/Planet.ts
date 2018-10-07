import Building from "./Building";
import { Vector3, Euler } from "three";
import rotateAroundPoint from "rotateAroundPoint";
import PlanetMesh from "PlanetMesh";
import Tile from "./Tile";

const rotationAxis = new Vector3(0, 1, 0)

export default class Planet {
	public readonly position: Vector3
	public readonly rotation: Euler
	public readonly buildings: Building[]
	public readonly mesh: PlanetMesh
	constructor(
		public readonly name: string,
		public readonly diameter: number,
		public readonly distanceFromSun: number,
		public readonly orbitalPeriod: number,
		public readonly rotationPeriod: number,
		public readonly orbitsAround: Vector3 = new Vector3(),
		startingRotation: number,
		public readonly tiles: Tile[][]
	){
		this.position = new Vector3(distanceFromSun * 4, 0, 0)
		// Here I'm reusing the starting rotation as both the position around the sun and the planet's local rotation
		rotateAroundPoint(this.position, this.orbitsAround, rotationAxis, startingRotation)
		this.rotation = new Euler(0, startingRotation, 0)
		this.mesh = new PlanetMesh(name, `textures/${name}.jpg`, diameter, this)
	}

	public update() {
		const theta = (1 / this.orbitalPeriod) / 10
		rotateAroundPoint(this.position, this.orbitsAround, rotationAxis, theta)
		this.rotation.y += (1 / this.rotationPeriod) / 10
	}
}