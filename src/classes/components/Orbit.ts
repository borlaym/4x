import Component from '../Component';
import { Vector3 } from 'three';
import Transform from './Transform';
import rotateAroundPoint from 'utils/rotateAroundPoint';

const rotationAxis = new Vector3(0, 1, 0)

/**
 * Make the entity orbit around a point
 */
export default class Orbit extends Component {
	constructor(
		public readonly orbitalPeriod: number,
		public readonly orbitsAround: Vector3
	) {
		super()
	}
	public update(dt: number): void {
		const { position } = this.gameObject.getComponent(Transform)
		const theta = (dt / this.orbitalPeriod) * (Math.PI * 2)
		rotateAroundPoint(position, this.orbitsAround, rotationAxis, theta)
	}
	protected handleEvent(event: GamepadEvent): void {
		return
	}
}