import { Vector3 } from "three";
import * as THREE from "three";

export default function createStarBackground() {

	const starsGeometry = new THREE.Geometry();
	const center = new Vector3()
	for (let i = 0; i < 10000; i++) {
		let distance = 0
		const star = new THREE.Vector3();
		while (distance < 500) {
			star.x = THREE.Math.randFloatSpread(1000);
			star.y = THREE.Math.randFloatSpread(1000);
			star.z = THREE.Math.randFloatSpread(1000);
			distance = star.distanceTo(center)
		}

		starsGeometry.vertices.push(star);

	}

	const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });

	return new THREE.Points(starsGeometry, starsMaterial);
}