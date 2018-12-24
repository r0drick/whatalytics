import Task from '.'
import * as React from 'react'
import Message from '../utils/Message'
import Pair from '../utils/Pair'
import {HorizontalBar} from 'react-chartjs-2'

export default class MessagesPerUser implements Task {
	readonly name: string = 'Messages Per User'
	private messages: { [key: string]: Pair<number, number> } = {}

	get element(): JSX.Element {
		return <HorizontalBar
				data={{
					labels: Object.keys(this.messages),
					datasets: [{
						label: 'Messages',
						data: Object.values(this.messages).map(value => value.first),
						backgroundColor: '#81D4FA',
					}, {
						label: 'Words',
						data: Object.values(this.messages).map(value => value.second),
						backgroundColor: '#FFD54F',
					}],
				}}/>
	}

	invoke(message: Message): void {
		if (typeof this.messages[message.author] === 'undefined')
			this.messages[message.author] = new Pair(1, 0)
		else
			this.messages[message.author].first++

		this.messages[message.author].second += message.content.match(/\S+/g)!.length || 0
	}
}