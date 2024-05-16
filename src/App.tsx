import dayjs, { Dayjs } from 'dayjs'

import isTodayPlugin from 'dayjs/plugin/isToday'
import toObjectPlugin from 'dayjs/plugin/toObject'
import weekdayPlugin from 'dayjs/plugin/weekday'
import { useEffect, useState } from 'react'
import Header from './components/calendar/Header'
import Sidebar from './components/calendar/Sidebar'
import ViewDates from './components/calendar/ViewDates'
import ViewDays from './components/calendar/ViewDays'
import { IFormattedDateObj, getFormattedDateObj, now } from './components/calendar/calender.utils'

dayjs.extend(isTodayPlugin)
dayjs.extend(toObjectPlugin)
dayjs.extend(weekdayPlugin)

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
		<main className="flex h-full">
			<Sidebar month={month} setMonth={setMonth} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />

			<div className="flex-1 ring-1 ring-border ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
				<Header
					currentMonth={currentMonth}
					onChangeCurrentMonth={(day) => {
						setCurrentMonth(day)
						setMonth(day.toISOString())
					}}
				/>
				<ViewDays />
				<div className="flex overflow-auto bg-border text-xs leading-6 text-foreground lg:flex-auto">
					<ViewDates arrayOfDays={arrayOfDays} />
				</div>
			</div>
		</main>
	)
}

export default App
