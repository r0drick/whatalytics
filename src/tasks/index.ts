import Message from '../utils/Message'

export const getTasks = (): Task[] => []

export default interface Task {
	readonly name: string

	invoke(message: Message): void

	readonly element: JSX.Element
}