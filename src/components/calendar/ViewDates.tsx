import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { IFormattedDateObj, eventsStoreAtom } from './calender.utils'
import { useAtom } from 'jotai'
import dayjs from 'dayjs'

export default function ViewDates({ arrayOfDays }: { arrayOfDays: IFormattedDateObj[][] }) {
	const rows: ReactNode[] = []
	let days: ReactNode[] = []
	const [eventsStore, setEventsStore] = useAtom(eventsStoreAtom)

	arrayOfDays.forEach((week) => {
		week.forEach((d) => {
			const currentDayEvents = eventsStore.filter((event) => dayjs(event.date).isSame(dayjs(d.iso), 'date'))
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
					<div className="mt-2">
						{currentDayEvents ? (
							<div className="space-y-1">
								{currentDayEvents?.map((event, idx) => (
									<div
										key={idx}
										className="flex cursor-pointer items-center gap-2 rounded-md px-2"
										style={{
											backgroundColor: `${event.color}19`,
										}}
									>
										<div className="h-2 w-2 rounded-full" style={{ backgroundColor: event.color }}></div>
										{event.title}
									</div>
								))}
							</div>
						) : null}
					</div>
				</div>,
			)
		})
		rows.push(days)
		days = []
	})

	return <div className="grid w-full grid-cols-7 grid-rows-6 gap-px">{rows}</div>
}
