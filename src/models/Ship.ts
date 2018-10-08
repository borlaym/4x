import Planet from "./Planet";
import { Vector3 } from "three";
import rotateAroundPoint from "rotateAroundPoint";

const orbitVector = (diameter: number) => new Vector3(diameter * 2, 0, 0)
const orbitingAxis = new Vector3(0, 1, 0)
const SPEED = 60 // Speed per days

export default class Ship {
	public orbitingAround: Planet | null
	public onRouteTo: Planet | null = null
	public movingTo: Vector3 | null
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
			this.rotationAroundPlanet += dDay / 5 * Math.PI * 2
			this.position = this.orbitingAround.position.clone()
				.add(orbitVector(this.orbitingAround.diameter))
			rotateAroundPoint(this.position, this.orbitingAround.position, orbitingAxis, this.rotationAroundPlanet)
		} else if (this.movingTo && this.onRouteTo) {
			const movement = this.movingTo.clone().sub(this.position).setLength(dDay * SPEED)
			this.position.add(movement)
			if (this.position.distanceTo(this.onRouteTo.position) < SPEED) {
				this.movingTo = null
				this.orbitingAround = this.onRouteTo
				this.onRouteTo = null
			}
		}
	}

	public goToPlanet(planet: Planet) {
		if (this.orbitingAround) {
			this.position = this.orbitingAround.position.clone()
		}
		this.orbitingAround = null;
		this.onRouteTo = planet
		let days = 0
		const planetPositionAfterDays = planet.position.clone()
		while (planetPositionAfterDays.distanceTo(this.position) > days * SPEED) {
			days = days + 1
			const orbit = (1 / planet.orbitalPeriod) * (Math.PI * 2)
			rotateAroundPoint(planetPositionAfterDays, planet.orbitsAround, orbitingAxis, orbit)
		}
		this.movingTo = planetPositionAfterDays
	}
}