import Message from '../utils/Message'

import MessagesPerUser from './MessagesPerUser'
import MessagesPerMonth from './MessagesPerMonth'

export const getTasks = (): Task[] => [
	new MessagesPerUser(),
	new MessagesPerMonth(),
]

export default interface Task {
	readonly name: string

	invoke(message: Message): void

	readonly element: JSX.Element
}