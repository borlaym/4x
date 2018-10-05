import * as THREE from "three";

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);


export default function createPlanets() {
	const earthTexture = new THREE.TextureLoader().load('textures/earth.jpg');
	const earthMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: earthTexture });
	const earth = new THREE.Mesh(sphereGeometry, earthMaterial);

	return [earth]
}