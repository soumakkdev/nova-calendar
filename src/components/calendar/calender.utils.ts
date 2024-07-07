import dayjs, { Dayjs } from 'dayjs'
import { atomWithStorage } from 'jotai/utils'

export const getFormattedDateObj = (date: Dayjs, currentMonth: number): IFormattedDateObj => {
	const clonedObject = { ...date.toObject() }
	const formatedObject = {
		date: clonedObject.date,
		month: clonedObject.months,
		year: clonedObject.years,
		isCurrentMonth: clonedObject.months === currentMonth,
		isCurrentDay: date.isToday(),
		iso: date.toISOString(),
	}
	return formatedObject
}

export const now = dayjs()
export const dayFormat = 'ddd'
export const dateFormat = 'MMMM YYYY'

export interface IFormattedDateObj {
	date: number
	month: number
	year: number
	isCurrentDay: boolean
	isCurrentMonth: boolean
	iso: string
}

export interface IEvent {
	id?: string
	title?: string
	date: string
	notes?: string
	color?: string
}

export const eventsStoreAtom = atomWithStorage<IEvent[]>('eventsStore', [])

export const EventsColors = [
	'#f44336',
	'#e91e63',
	'#9c27b0',
	'#673ab7',
	'#3f51b5',
	'#2196f3',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#4caf50',
	'#8bc34a',
	'#cddc39',
	'#ffeb3b',
	'#ffc107',
	'#ff9800',
	'#ff5722',
	'#795548',
	'#607d8b',
]

export function pickRandom(array: any[]) {
	const r = Math.floor(Math.random() * array.length)
	return array[r]
}
