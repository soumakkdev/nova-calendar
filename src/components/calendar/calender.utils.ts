import dayjs, { Dayjs } from 'dayjs'

export const getFormattedDateObj = (date: Dayjs, currentMonth: number): IFormattedDateObj => {
	const clonedObject = { ...date.toObject() }
	const formatedObject = {
		date: clonedObject.date,
		month: clonedObject.months,
		year: clonedObject.years,
		isCurrentMonth: clonedObject.months === currentMonth,
		isCurrentDay: date.isToday(),
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
}
