import * as React from 'react'
import Task from './index'
import Message from '../utils/Message'
import {Line} from 'react-chartjs-2'

enum Month {
	January,
	February,
	March,
	April,
	May,
	June,
	July,
	August,
	September,
	October,
	November,
	December,
}

export default class MessagesPerMonth implements Task {
	readonly name: string = 'Messages Per Month'
	private months: number[] = Array.apply(null, Array(11)).map(() => 0)

	invoke(message: Message): void {
		const month = message.date.getMonth()
		if (typeof this.months[month] === 'undefined')
			this.months[month] = 1
		else
			this.months[month]++
	}

	get element(): JSX.Element {
		return <Line
				data={{
					labels: Object.keys(Month).filter(k => typeof Month[k as any] === 'number'),
					datasets: [{
						label: 'Messages',
						data: Object.values(this.months),
						backgroundColor: '#81D4FA',
					}],
				}}/>
	}
}