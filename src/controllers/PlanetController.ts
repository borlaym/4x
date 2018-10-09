import Planet from "models/Planet";
import { Vector3 } from "three";
import * as THREE from "three";
import Tile, { Bonus } from "models/Tile";

const sunPosition = new Vector3()

const createTiles = (bonuses: Bonus[][]): Tile[][] => {
	const tiles: Tile[][] = []
	bonuses.forEach(bonuses => {
		tiles.push(bonuses.map(bonus => new Tile(bonus)))
	})
	return tiles
}

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
			THREE.Math.randFloat(0, Math.PI * 2),
			createTiles(
				[
					[Bonus.None, Bonus.None, Bonus.Steel, Bonus.None],
					[Bonus.None, Bonus.None, Bonus.None, Bonus.None],
					[Bonus.None, Bonus.Titanium, Bonus.Steel, Bonus.None],
					[Bonus.None, Bonus.None, Bonus.None, Bonus.Steel]
				]
			)
		))
		this.planets.push(new Planet(
			'Venus',
			12.104,
			108.2,
			224.7,
			-5832.5,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2),
			createTiles(
				[
					[Bonus.None, Bonus.None],
					[Bonus.None, Bonus.None]
				]
			)
		))
		this.planets.push(new Planet(
			'Earth',
			12.756,
			149.6,
			365.2,
			23.9,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2),
			createTiles(
				[
					[Bonus.Food, Bonus.None, Bonus.Food, Bonus.Food],
					[Bonus.Steel, Bonus.None, Bonus.Food, Bonus.Titanium],
					[Bonus.None, Bonus.Food, Bonus.Food, Bonus.None],
					[Bonus.None, Bonus.Steel, Bonus.None, Bonus.Steel]
				]
			)
		))
		this.planets.push(new Planet(
			'Mars',
			6.792,
			227.9,
			687.0,
			24.6,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2),
			createTiles(
				[
					[Bonus.Titanium, Bonus.None, Bonus.None, Bonus.None],
					[Bonus.Steel, Bonus.None, Bonus.None, Bonus.None],
					[Bonus.None, Bonus.Titanium, Bonus.None, Bonus.None],
					[Bonus.Steel, Bonus.Titanium, Bonus.None, Bonus.Steel]
				]
			)
		))
		this.planets.push(new Planet(
			'Jupiter',
			142.984,
			778.6,
			4331,
			9.9,
			sunPosition,
			THREE.Math.randFloat(0, Math.PI * 2),
			createTiles(
				[]
			)
		))
	}

	public getByName(name: string) {
		return this.planets.find(planet => planet.name === name)
	}
}