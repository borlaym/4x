import { v4 as uuid } from 'uuid'
import Component from 'classes/Component';

export default class GameObject {
	public readonly id: string
	constructor(
		private readonly components: Component[] = []
	) {
		this.id = uuid()
	}
	public update(dt: number): void {}
	public getComponent(name: string): Component {
		const component = this.components.find(c => c.name === name)
		if (!component) {
			throw new Error('Requested component not found: ' + name)
		}
		return component
	}

}