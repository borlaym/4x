import { Vector3 } from "three";

export default function rotateAroundPoint(pos: THREE.Vector3, point: Vector3, axis: Vector3, theta: number) {
	pos.sub(point); // remove the offset
	pos.applyAxisAngle(axis, theta); // rotate the POSITION
	pos.add(point); // re-add the offset
}
