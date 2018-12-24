import * as React from 'react'
import Message from './Message'
import Task, {getTasks} from '../tasks'

enum DateFormat {
	MonthFirst,
	DayFirst,
	Unknown,
}

export default class Parser {
	private static readonly regex = RegExp(/((?:\d\d?\/?){3}), (\d\d?:\d\d(?: [A|P]M)?) - ([^:]*): ([\s\S]*?)(?=(?:\d\d?\/?){3}, \d\d?:\d\d(?: [A|P]M)? - )/g)
	tasks: Task[]
	dateFormat: DateFormat

	constructor(tasks: Task[] = getTasks(), dateFormat: DateFormat = DateFormat.Unknown) {
		this.tasks = tasks
		this.dateFormat = dateFormat
	}

	run(chat: string): JSX.Element[] {
		chat = chat + '0/0/0, 0:00 - '

		if (this.dateFormat === DateFormat.Unknown) {
			const foundFormat = Parser.findDateFormat(chat)
			if (foundFormat === DateFormat.Unknown) {
				//TODO: do something if the format couldn't be found
			} else {
				this.dateFormat = foundFormat
			}
		}

		let match: RegExpExecArray | null
		while (match = Parser.regex.exec(chat)) {
			let msg: Message = this.parse(match)
			for (let task of this.tasks)
				task.invoke(msg)
		}

		return this.tasks.map(task => task.element)
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

	private parse(match: RegExpExecArray): Message {
		let day, month
		let [a, b, year] = match[1].split('/').map(str => Number(str))
		if (this.dateFormat === DateFormat.DayFirst) [day, month] = [a, b]
		else if (this.dateFormat === DateFormat.MonthFirst) [day, month] = [b, a]
		else throw new Error('Unknown Date format (Day first or Month first?)')

		let [hour, minute] = match[2].split(':').map(str => Number(str.substr(0, 2)))
		if (match[2].endsWith('PM')) hour += 12 // Handle AM/PM time structure

		return new Message(match[4], match[3], new Date(year, month - 1, day, hour, minute))
	}
}