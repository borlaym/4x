import Building from "./Building";
import Planet from "Planet";

export default class PlanetModel {
	public readonly buildings: Building[]
	constructor(
		public readonly name: string,
		public readonly object: Planet | undefined
	){
		if (typeof object === 'undefined') {
			throw new Error('Cant find planet object ' + name)
		}
	}
}