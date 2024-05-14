import dayjs, { Dayjs } from 'dayjs'

import isTodayPlugin from 'dayjs/plugin/isToday'
import toObjectPlugin from 'dayjs/plugin/toObject'
import weekdayPlugin from 'dayjs/plugin/weekday'
import { useEffect, useState } from 'react'
import AddEventModal from './components/calendar/AddEventModal'
import Header from './components/calendar/Header'
import ViewDates from './components/calendar/ViewDates'
import ViewDays from './components/calendar/ViewDays'
import { IFormattedDateObj, eventsStoreAtom, getFormattedDateObj, now } from './components/calendar/calender.utils'
import { Button } from './components/ui/button'
import { Calendar } from './components/ui/calendar'
import { useAtom } from 'jotai'
import { produce } from 'immer'

dayjs.extend(isTodayPlugin)
dayjs.extend(toObjectPlugin)
dayjs.extend(weekdayPlugin)

function App() {
	const [currentMonth, setCurrentMonth] = useState<Dayjs>(now)
	const [arrayOfDays, setArrayOfDays] = useState<IFormattedDateObj[][]>([])
	const [eventsStore, setEventsStore] = useAtom(eventsStoreAtom)
	const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)

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

			<div className="flex flex-1 ">
				<div>
					<Button onClick={() => setIsAddEventDialogOpen(true)}>Create Event</Button>
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

					<h3>All Events</h3>
					{eventsStore?.map((event) => <div key={event.id}>{event.title}</div>)}
				</div>

				<div className="ring-1 ring-border ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
					<ViewDays />
					<div className="flex overflow-auto bg-border text-xs leading-6 text-foreground lg:flex-auto">
						<ViewDates arrayOfDays={arrayOfDays} />
					</div>
				</div>
			</div>

			<AddEventModal
				open={isAddEventDialogOpen}
				onClose={() => setIsAddEventDialogOpen(false)}
				onConfirm={(data) => {
					setEventsStore(
						produce((draft) => {
							draft.push(data)
						}),
					)
				}}
			/>
		</main>
	)
}

export default App
