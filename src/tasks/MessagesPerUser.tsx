import Task from '.'
import * as React from 'react'
import Message from '../utils/Message'
import Pair from '../utils/Pair'

export default class MessagesPerUser implements Task {
	name: string = 'Messages Per User'
	private messages: { [key: string]: number } = {}

	invoke(message: Message): void {
		if (typeof this.messages[message.author] === 'undefined')
			this.messages[message.author] = 1
		else
			this.messages[message.author]++
	}

	get element(): JSX.Element {
		let userArray: Pair<string, number>[] = []
		for (let author in this.messages)
			userArray.push(new Pair<string, number>(author, this.messages[author]))
		userArray.sort((a, b) => b.second - a.second)

		return <div key={this.name}><h5>{this.name}</h5>{userArray.map(pair => <>{pair.first}: {pair.second}<br/></>)}</div>
	}
}