import GameScene from "GameScene";
import Company from "models/Company";

interface GameState {
	keysDown: string[],
	mousePos: {
		x: number,
		y: number
	},
	days: number,
	speed: number,
	activeScene: GameScene,
	company: Company
};

export default GameState