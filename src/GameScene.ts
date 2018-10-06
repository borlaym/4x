import GameState from "GameState";
import Planet from "./Planet";

interface GameScene {
	scene: THREE.Scene,
	camera: THREE.Camera,
	name: string,
	onClick: (state: GameState, callback: (planet?: Planet) => void) => void,
	onShow: () => void,
	update: (state: GameState) => void
}

export default GameScene