import * as React from 'react'
import Task from './index'
import Message from '../utils/Message'

enum Month {
	// noinspection JSUnusedGlobalSymbols
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
	private months: {[key: number]: number} = {}

	invoke(message: Message): void {
		const month = message.date.getMonth()
		if (typeof this.months[month] === 'undefined')
			this.months[month] = 1
		else
			this.months[month]++
	}

	get element(): JSX.Element {
		return (<>
			<div key={this.name}>
				<h5>{this.name}</h5>
				{Object.keys(this.months).map(key => Number(key)).map(month => <>{Month[month]}: {this.months[month]}<br/></>)}
			</div>
		</>)
	}
}