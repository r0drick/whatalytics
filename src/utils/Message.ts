export default class Message {
	content: string
	author: string
	date: Date

	constructor(content: string, author: string, date: Date) {
		this.content = content
		this.author = author
		this.date = date
	}
}