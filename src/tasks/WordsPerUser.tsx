import Task from '.'
import * as React from 'react'
import Message from '../utils/Message'
import Pair from '../utils/Pair'

export default class WordsPerUser implements Task {
	readonly name: string = 'Words Per User'
	private messages: { [key: string]: number } = {}

	invoke(message: Message): void {
		const words: number = message.content.match(/\S+/g)!.length || 0
		if (typeof this.messages[message.author] === 'undefined')
			this.messages[message.author] = words
		else
			this.messages[message.author] += words
	}

	get element(): JSX.Element {
		let msgsArray: Pair<string, number>[] = []
		for (let author in this.messages)
			msgsArray.push(new Pair<string, number>(author, this.messages[author]))
		msgsArray.sort((a, b) => b.second - a.second)

		return <div key={this.name}><h5>{this.name}</h5>{msgsArray.map(pair => <>{pair.first}: {pair.second}<br/></>)}</div>
	}
}