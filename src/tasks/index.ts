import Message from '../utils/Message'
import MessagesPerUser from './MessagesPerUser'
import WordsPerUser from './WordsPerUser'

export const getTasks = (): Task[] => [
		new MessagesPerUser(),
		new WordsPerUser()
]

export default interface Task {
	readonly name: string

	invoke(message: Message): void

	readonly element: JSX.Element
}