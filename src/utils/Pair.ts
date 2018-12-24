export default class Pair<A, B> {
	first: A
	second: B

	constructor(first: A, second: B) {
		this.first = first
		this.second = second
	}

	toString = (): string => `Pair(${this.first}, ${this.second})`
	toList = (): [A, B] => [this.first, this.second]
}