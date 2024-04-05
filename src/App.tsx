import dayjs, { Dayjs } from 'dayjs'

import isTodayPlugin from 'dayjs/plugin/isToday'
import toObjectPlugin from 'dayjs/plugin/toObject'
import weekdayPlugin from 'dayjs/plugin/weekday'
import { ReactNode, useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from './lib/utils'
import { Calendar } from './components/ui/calendar'

dayjs.extend(isTodayPlugin)
dayjs.extend(toObjectPlugin)
dayjs.extend(weekdayPlugin)

const now = dayjs()
const dateFormat = 'MMM YYYY'
const dayFormat = 'ddd'

interface IFormattedDateObj {
	date: number
	month: number
	year: number
	isCurrentDay: boolean
	isCurrentMonth: boolean
}

const getFormattedDateObj = (date: Dayjs, currentMonth: number): IFormattedDateObj => {
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

function App() {
	const [currentMonth, setCurrentMonth] = useState<Dayjs>(now)
	const [arrayOfDays, setArrayOfDays] = useState<IFormattedDateObj[][]>([])

	const getAllDays = () => {
		let currentDate = currentMonth.startOf('month').weekday(0) // 1st sunday in this month
		const nextMonth = currentMonth.add(1, 'month').month()

		const allDates = []
		let weekDates = []
		let weekCounter = 1

		while (currentDate.weekday(0).toObject().months !== nextMonth) {
			const formatted = getFormattedDateObj(currentDate, currentMonth.month())
			weekDates.push(formatted)
			if (weekCounter === 7) {
				allDates.push(weekDates)
				weekDates = []
				weekCounter = 0
			}
			weekCounter++
			currentDate = currentDate.add(1, 'day')
		}
		setArrayOfDays(allDates)
	}

	useEffect(() => {
		getAllDays()
	}, [currentMonth])

	const [month, setMonth] = useState(currentMonth.toISOString())

	return (
		<main className="flex h-full flex-col">
			<Header
				currentMonth={currentMonth}
				onChangeCurrentMonth={(day) => {
					setCurrentMonth(day)
					setMonth(day.toISOString())
				}}
			/>

			<div className="flex-1">
				<Calendar
					mode="single"
					month={dayjs(month).toDate()}
					onMonthChange={(date) => setMonth(date.toISOString())}
					selected={currentMonth.toDate()}
					onSelect={(date) => {
						setCurrentMonth(dayjs(date))
					}}
					className="rounded-md border"
				/>

				<div className="ring-1 ring-border ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
					<ViewDays />
					<div className="flex overflow-auto bg-border text-xs leading-6 text-foreground lg:flex-auto">
						<ViewDates arrayOfDays={arrayOfDays} />
					</div>
				</div>
			</div>
		</main>
	)
}

export default App

function ViewDates({ arrayOfDays }: { arrayOfDays: IFormattedDateObj[][] }) {
	const rows: ReactNode[] = []
	let days: ReactNode[] = []

	arrayOfDays.forEach((week) => {
		week.forEach((d) => {
			days.push(
				<div
					key={d.date}
					className={cn('relative overflow-auto bg-background font-medium text-foreground', 'relative px-2 py-2', {
						'bg-muted text-muted-foreground': !d.isCurrentMonth,
					})}
				>
					<time
						dateTime={d.date.toString()}
						className={cn('sticky top-0 grid h-6 w-6 place-content-center rounded-full', {
							'bg-primary text-primary-foreground': d.isCurrentDay,
						})}
					>
						{d.date}
					</time>
				</div>,
			)
		})
		rows.push(days)
		days = []
	})

	return <div className="grid w-full grid-cols-7 grid-rows-6 gap-px">{rows}</div>
}

function ViewDays() {
	const days = []
	for (let i = 0; i < 7; i++) {
		days.push(
			<div key={i} className="bg-background py-2 text-xs uppercase text-muted-foreground">
				{now.weekday(i).format(dayFormat)}
			</div>,
		)
	}
	return (
		<div className="grid grid-cols-7 gap-px border-b border-border bg-border text-center text-xs font-semibold leading-6 text-foreground lg:flex-none">
			{days}
		</div>
	)
}

function Header({ currentMonth, onChangeCurrentMonth }: { currentMonth: Dayjs; onChangeCurrentMonth: (day: Dayjs) => void }) {
	const nextMonth = () => {
		const plus = currentMonth.add(1, 'month')
		onChangeCurrentMonth(plus)
	}
	const prevMonth = () => {
		const minus = currentMonth.subtract(1, 'month')
		onChangeCurrentMonth(minus)
	}

	return (
		<header className="flex items-center justify-between px-4 py-2">
			<span className="text-lg font-semibold">{currentMonth.format(dateFormat)}</span>

			<div className="flex items-center gap-2">
				<Button size="sm" variant="outline" onClick={() => onChangeCurrentMonth(dayjs())}>
					Today
				</Button>

				<Button onClick={prevMonth} variant="outline" className="h-9 w-9 rounded-full p-0">
					<ChevronLeft className="h-5 w-5 text-muted-foreground" />
				</Button>
				<Button onClick={nextMonth} variant="outline" className="h-9 w-9 rounded-full p-0">
					<ChevronRight className="h-5 w-5 text-muted-foreground" />
				</Button>
			</div>
		</header>
	)
}
