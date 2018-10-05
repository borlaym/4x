import * as THREE from "three";

export default function createPlanets() {

	const sunGeometry = new THREE.SphereGeometry(59, 32, 32);
	const sunMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xffff00 });
	const sun = new THREE.Mesh(sunGeometry, sunMaterial);

	const mercuryGeometry = new THREE.SphereGeometry(4.879, 32, 32);
	const mercuryTexture = new THREE.TextureLoader().load('textures/mercury.jpg');
	const mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: mercuryTexture });
	const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
	mercury.position.x = 57.9 * 4

	const venusGeometry = new THREE.SphereGeometry(12.104, 32, 32);
	const venusTexture = new THREE.TextureLoader().load('textures/venus.png');
	const venusMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: venusTexture });
	const venus = new THREE.Mesh(venusGeometry, venusMaterial);
	venus.position.x = 108.2 * 4


	const earthGeometry = new THREE.SphereGeometry(12.756, 32, 32);
	const earthTexture = new THREE.TextureLoader().load('textures/earth.jpg');
	const earthMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: earthTexture });
	const earth = new THREE.Mesh(earthGeometry, earthMaterial);
	earth.position.x = 149.6 * 4


	const marsGeometry = new THREE.SphereGeometry(6.792, 32, 32);
	const marsTexture = new THREE.TextureLoader().load('textures/mars.jpg');
	const marsMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: marsTexture });
	const mars = new THREE.Mesh(marsGeometry, marsMaterial);
	mars.position.x = 227.9 * 4




	return [sun, mercury, venus, earth, mars]
}