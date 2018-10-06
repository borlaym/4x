import PlanetModel from "models/PlanetModel";
import Planet from "../Planet";

export default class PlanetController {
	public readonly planets: PlanetModel[] = []
	constructor(planetObjects: Planet[]) {
		this.planets.push(new PlanetModel('Mercury', planetObjects.find(planet => planet.name === 'Mercury')))
		this.planets.push(new PlanetModel('Venus', planetObjects.find(planet => planet.name === 'Venus')))
		this.planets.push(new PlanetModel('Earth', planetObjects.find(planet => planet.name === 'Earth')))
		this.planets.push(new PlanetModel('Mars', planetObjects.find(planet => planet.name === 'Mars')))
	}

	public getByName(name: string) {
		return this.planets.find(planet => planet.name === name)
	}
}