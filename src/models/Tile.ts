import Company from "./Company";
import Building from "./Building";

enum Bonus {
	None,
	Food,
	Steel,
	Titanium
}

export default class Tile {
	public ownedBy: Company | null = null;
	public building: Building | null = null;
	constructor(
		public readonly bonus: Bonus
	) {}
}

export {
	Bonus
}