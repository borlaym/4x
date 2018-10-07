import Component from "./Component";
import { Euler } from "three";

export default class Rotation extends Component {
	public readonly name = 'Rotation';
	public rotation: Euler = new Euler()
}