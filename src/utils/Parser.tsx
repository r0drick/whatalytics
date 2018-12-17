import * as React from 'react'
import Message from './Message'
import Task, {getTasks} from '../tasks'
import * as ReactDOM from 'react-dom'

export default class Parser {
	private regex = RegExp(/((?:\d\d?\/?){3}), (\d\d?:\d\d) - ([^:]*): ([\s\S]*?)(?=(?:\d\d?\/?){3}, \d\d:\d\d - )/g)

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
		const [year, month, day] = match[1].split('/').map(str => Number(str))
		const [hour, minute] = match[2].split(':').map(str => Number(str))

		return new Message(match[4], match[3], new Date(year, month, day, hour, minute))
	}
}