import * as React from 'react'
import Message from './Message'
import Task, {getTasks} from '../tasks'
import * as ReactDOM from 'react-dom'

export default class Parser {
	private readonly regex = RegExp(/((?:\d\d?\/?){3}), (\d\d?:\d\d(?: [A|P]M)) - ([^:]*): ([\s\S]*?)(?=(?:\d\d?\/?){3}, \d\d?:\d\d(?: [A|P]M) - )/g)

	constructor(chat: string) {
		const tasks: Task[] = getTasks()

		chat = chat + '00/00/00, 00:00 - '
		let match: RegExpExecArray | null
		while (match = this.regex.exec(chat)) {
			let msg: Message = Parser.parse(match)
			for (let task of tasks)
				task.invoke(msg)
		}

		let elements: JSX.Element[] = []
		for (let task of tasks)
			elements.push(task.element)

		ReactDOM.render(<>{elements}</>, document.querySelector('#result'))
	}

	private static parse(match: RegExpExecArray): Message {
		let [year, month, day] = match[1].split('/').map(str => Number(str))
		let [hour, minute] = match[2].split(':').map(str => Number(str.substr(0, 2)))
		if (match[2].endsWith('PM')) hour += 12 // Handle AM/PM time structure

		return new Message(match[4], match[3], new Date(year, month, day, hour, minute))
	}
}