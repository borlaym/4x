import GameState from "GameState";
import Planet from "./models/Planet";

interface GameScene {
	scene: THREE.Scene,
	camera: THREE.Camera,
	name: string,
	onClick: (state: GameState, callback: (planet?: Planet) => void) => void,
	onWheel: (event: Event) => void,
	onShow: () => void,
	update: (state: GameState) => void
}

export default GameScene