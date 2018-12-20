import Component from '../Component';
import { Vector3 } from 'three';
import Transform from './Transform';

interface MovementData {
	startPos: Vector3,
	endPos: Vector3,
	duration: number,
	progress: number
}

export default class Movement extends Component {
	private movement: MovementData | null = null

	public moveTo(to: Vector3, duration = 300) {
		const currentPos = this.gameObject.getComponent(Transform).position.clone()
		this.movement = {
			startPos: currentPos,
			endPos: to,
			duration,
			progress: 0
		}
	}


	public update(dt: number): void {
		if (this.movement) {
			const progress = Math.min(this.movement.progress + dt, this.movement.duration)
			// const leftOver = this.movement.progress + dt - this.movement.duration
			this.movement.progress = progress
			const movementDirection = this.movement.endPos.clone().sub(this.movement.startPos.clone())
			const entireMovementLength = movementDirection.length()
			movementDirection.setLength(entireMovementLength * (progress / this.movement.duration))
			const newPos = this.movement.startPos.clone().add(movementDirection)
			this.gameObject.getComponent(Transform).position.set(newPos.x, newPos.y, newPos.z)
			if (this.movement.progress === this.movement.duration) {
				this.movement = null;
			}
		}
	}
	protected handleEvent(event: GamepadEvent): void {
		return
	}
}