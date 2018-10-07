import GameScene from "GameScene";
import Company from "models/Company";

interface GameState {
	keysDown: string[],
	mousePos: {
		x: number,
		y: number
	},
	activeScene: GameScene,
	company: Company
};

export default GameState