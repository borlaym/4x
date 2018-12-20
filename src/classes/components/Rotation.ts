import Component from '../Component';
import Transform from './Transform';

/**
 * Slow down planet rotation, since it has no gameplay effect anyway
 */
const ROTATION_CONSTANT = 0.1

/**
 * Add constant rotation of component
 */
export default class Rotation extends Component {
	constructor(
		public readonly rotationPeriod: number
	) {
		super()
	}
	public update(dt: number): void {
		const { rotation } = this.gameObject.getComponent(Transform)
		rotation.y += ((dt * 24) / this.rotationPeriod) * (Math.PI * 2) * ROTATION_CONSTANT
	}
	protected handleEvent(event: GamepadEvent): void {
		return
	}
}