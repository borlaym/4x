import GameState from "GameState";
import PlanetMesh from "PlanetMesh";

interface GameScene {
	scene: THREE.Scene,
	camera: THREE.Camera,
	name: string,
	onClick: (state: GameState, callback: (planet?: PlanetMesh) => void) => void,
	onShow: () => void,
	update: (state: GameState) => void
}

export default GameScene