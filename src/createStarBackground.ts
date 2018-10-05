import { Vector3 } from "three";
import * as THREE from "three";

export default function createStarBackground() {

	const starsGeometry = new THREE.Geometry();
	const center = new Vector3()
	for (let i = 0; i < 40000; i++) {
		let distance = 0
		const star = new THREE.Vector3();
		while (distance < 4000) {
			star.x = THREE.Math.randFloatSpread(10000);
			star.y = THREE.Math.randFloatSpread(10000);
			star.z = THREE.Math.randFloatSpread(10000);
			distance = star.distanceTo(center)
		}

		starsGeometry.vertices.push(star);

	}

	const starsMaterial = new THREE.PointsMaterial({ color: 0x888888, sizeAttenuation: false });

	return new THREE.Points(starsGeometry, starsMaterial);
}