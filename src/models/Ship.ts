import Planet from "./Planet";
import { Vector3 } from "three";
import rotateAroundPoint from "rotateAroundPoint";

const orbitVector = (diameter: number) => new Vector3(diameter * 2, 0, 0)
const orbitingAxis = new Vector3(0, 1, 0)

export default class Ship {
	public orbitingAround: Planet | null
	public onRouteTo: Planet | null = null
	public position: Vector3
	private rotationAroundPlanet: number
	
	constructor(
		orbitingAround: Planet
	) {
		this.orbitingAround = orbitingAround
		this.position = orbitingAround.position
		this.rotationAroundPlanet = 1
	}

	public update(dDay: number) {
		if (this.orbitingAround) {
			this.rotationAroundPlanet += dDay / 2 * Math.PI * 2
			this.position = this.orbitingAround.position.clone()
				.add(orbitVector(this.orbitingAround.diameter))
			rotateAroundPoint(this.position, this.orbitingAround.position, orbitingAxis, this.rotationAroundPlanet)
			console.log(this.position)
		}
	}
}