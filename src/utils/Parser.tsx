import * as React from 'react'
import Message from './Message'
import Task, {getTasks} from '../tasks'
import * as ReactDOM from 'react-dom'

enum DateFormat {
	MonthFirst,
	DayFirst,
	Unknown,
}

export default class Parser {
	private static readonly regex = RegExp(/((?:\d\d?\/?){3}), (\d\d?:\d\d(?: [A|P]M)?) - ([^:]*): ([\s\S]*?)(?=(?:\d\d?\/?){3}, \d\d?:\d\d(?: [A|P]M)? - )/g)
	dateFormat: DateFormat = DateFormat.Unknown

	constructor(chat: string) {
		const tasks: Task[] = getTasks()

		chat = chat + '0/0/0, 0:00 - '
		this.dateFormat = Parser.findDateFormat(chat)

		let match: RegExpExecArray | null
		while (match = Parser.regex.exec(chat)) {
			let msg: Message = Parser.parse(match, this.dateFormat)
			for (let task of tasks)
				task.invoke(msg)
		}

		let elements: JSX.Element[] = []
		for (let task of tasks)
			elements.push(task.element)

		ReactDOM.render(<>{elements}</>, document.querySelector('#result'))
	}

	private static findDateFormat(chat: string): DateFormat {
		let match: RegExpExecArray | null
		while (match = Parser.regex.exec(chat)) {
			let [a, b] = match[1].split('/').map(str => Number(str))
			if (a > 12)
				return DateFormat.DayFirst
			else if (b > 12)
				return DateFormat.MonthFirst
		}
		return DateFormat.Unknown
	}

	private static parse(match: RegExpExecArray, dateFormat: DateFormat): Message {
		let day, month
		let [a, b, year] = match[1].split('/').map(str => Number(str))
		if (dateFormat === DateFormat.DayFirst) [day, month] = [a, b]
		else if (dateFormat === DateFormat.MonthFirst) [day, month] = [b, a]
		else throw new Error('Unknown Date format (Day first or Month first?)')

		let [hour, minute] = match[2].split(':').map(str => Number(str.substr(0, 2)))
		if (match[2].endsWith('PM')) hour += 12 // Handle AM/PM time structure

		return new Message(match[4], match[3], new Date(year, month - 1, day, hour, minute))
	}
}