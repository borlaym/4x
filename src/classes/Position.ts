import Component from "./Component";
import { Vector3 } from "three";

export default class Position extends Component {
	public readonly name = 'Position';
	public position: Vector3 = new Vector3()
}