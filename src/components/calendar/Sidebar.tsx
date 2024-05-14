import dayjs, { Dayjs } from 'dayjs'
import { useAtom } from 'jotai'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { eventsStoreAtom } from './calender.utils'
import { Plus } from 'lucide-react'

export default function Sidebar({
	month,
	setMonth,
	currentMonth,
	setCurrentMonth,
	onCreateEvent,
}: {
	month: string
	setMonth: (value: string) => void
	currentMonth: Dayjs
	setCurrentMonth: (value: Dayjs) => void
	onCreateEvent: () => void
}) {
	const [eventsStore, setEventsStore] = useAtom(eventsStoreAtom)

	return (
		<div className="space-y-5 p-4">
			<div className="flex items-center gap-2">
				<img width={40} src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_14_2x.png" alt="Logo" />
				<p className="mb-1 text-xl font-bold">Calender</p>
			</div>

			<Button onClick={onCreateEvent}>
				<Plus className="mr-1 h-5 w-5" />
				Create Event
			</Button>

			<Calendar
				mode="single"
				month={dayjs(month).toDate()}
				onMonthChange={(date) => setMonth(date.toISOString())}
				selected={currentMonth.toDate()}
				onSelect={(date) => {
					setCurrentMonth(dayjs(date))
				}}
				className="p-0"
			/>

			<div>
				<h3 className="mb-2 text-lg font-bold">All Events</h3>
				<div className="space-y-2">
					{eventsStore?.map((event) => (
						<div key={event.id} className="flex items-center gap-2 rounded-md p-1 px-3 text-sm font-medium">
							<div className="h-2 w-2 rounded-full" style={{ backgroundColor: event.color }}></div>
							{event.title}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
