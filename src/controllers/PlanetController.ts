import Planet from "models/Planet";
import { Vector3 } from "three";
import * as THREE from "three";

const sunPosition = new Vector3()

export default class PlanetController {
	public readonly planets: Planet[] = []
	constructor() {
		this.planets.push(new Planet(
			'Mercury',
			4.879,
			57.9,
			88,
			1407.6,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2)
		))
		this.planets.push(new Planet(
			'Venus',
			12.104,
			108.2,
			224.7,
			-5832.5,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2)
		))
		this.planets.push(new Planet(
			'Earth',
			12.756,
			149.6,
			365.2,
			23.9,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2)
		))
		this.planets.push(new Planet(
			'Mars',
			6.792,
			227.9,
			687.0,
			24.6,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2)
		))
	}

	public getByName(name: string) {
		return this.planets.find(planet => planet.name === name)
	}
}