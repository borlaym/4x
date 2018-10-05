import GameState from "GameState";
import Planet from "./Planet";

interface GameScene {
	scene: THREE.Scene,
	camera: THREE.Camera,
	onClick: (state: GameState, callback: (planet?: Planet) => void) => void,
	update: (state: GameState) => void
}

export default GameScene