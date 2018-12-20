import GameObject from './GameObject';

class GameWorld {
	private readonly gameObjects: GameObject[] = []
	public addObject(gameObject: GameObject) {
		this.gameObjects.push(gameObject)
	}

	public setup() {
	}

	public update(dt: number) {
		this.gameObjects.forEach(o => o.update(dt))
	}

}

export default new GameWorld()