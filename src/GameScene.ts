import GameState from "GameState";

interface GameScene {
	scene: THREE.Scene,
	camera: THREE.Camera,
	onClick: (state: GameState) => void,
	update: (state: GameState) => void
}

export default GameScene