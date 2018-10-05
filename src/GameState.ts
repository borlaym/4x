import GameScene from "GameScene";

interface GameState {
	keysDown: string[],
	mousePos: {
		x: number,
		y: number
	},
	activeScene: GameScene
};

export default GameState