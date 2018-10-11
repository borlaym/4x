import GameScene from "GameScene";
import Company from "models/Company";
import Planet from "models/Planet";
import Ship from "models/Ship";

interface GameState {
	keysDown: string[],
	mousePos: {
		x: number,
		y: number
	},
	days: number,
	speed: number,
	activeScene: GameScene | null,
	company: Company,
	planets: Planet[],
	ships: Ship[]
};

export default GameState