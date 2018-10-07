enum Color {
	Red = 'red',
	Blue = 'blue',
	Green = 'green'
}

export default class Company {
	public credits: number = 60
	constructor(
		public readonly name: string,
		public readonly color: Color
	) {}
}