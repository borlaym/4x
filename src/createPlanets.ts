import Planet from "Planet";

export default function createPlanets() {

	const Mercury = new Planet(
		'Mercury',
		'textures/mercury.jpg',
		4.879,
		57.9,
		88
	)

	const Venus = new Planet(
		'Venus',
		'textures/venus.png',
		12.104,
		108.2,
		224.7
	)

	const Earth = new Planet(
		'Earth',
		'textures/earth.jpg',
		12.756,
		149.6,
		365.2
	)

	const Mars = new Planet(
		'Mars',
		'textures/mars.jpg',
		6.792,
		227.9,
		687.0
	)

	return [Mercury, Venus, Earth, Mars]
}