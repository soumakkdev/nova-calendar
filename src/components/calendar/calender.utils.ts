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
export const dateFormat = 'MMM YYYY'

export interface IFormattedDateObj {
	date: number
	month: number
	year: number
	isCurrentDay: boolean
	isCurrentMonth: boolean
	iso: string
}

export interface IEvent {
	id: string
	title: string
	date: string
	note?: string
}

export const eventsStoreAtom = atomWithStorage<IEvent[]>('eventsStore', [])
