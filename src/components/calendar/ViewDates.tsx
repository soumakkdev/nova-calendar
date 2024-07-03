import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { Plus } from 'lucide-react'
import { ReactNode } from 'react'
import AddEventPopover from './AddEventPopover'
import ViewEventPopover from './ViewEventPopover'
import { IFormattedDateObj, eventsStoreAtom } from './calender.utils'

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
					className={cn('group relative overflow-auto bg-background font-medium text-foreground', 'relative px-2 py-2', {
						'bg-muted text-muted-foreground': !d.isCurrentMonth,
					})}
				>
					<div className="flex items-center justify-between ">
						<time
							dateTime={d.date.toString()}
							className={cn('sticky top-0 grid h-6 w-6 place-content-center rounded-full', {
								'bg-primary text-primary-foreground': d.isCurrentDay,
							})}
						>
							{d.date}
						</time>

						<AddEventPopover
							isEdit={false}
							initialData={{
								date: d.iso,
								color: '#607d8b',
							}}
							children={<Plus className="h-4 w-4 cursor-pointer text-muted-foreground opacity-0 group-hover:opacity-100" />}
						/>
					</div>
					<div className="mt-2">
						{currentDayEvents ? (
							<div className="space-y-1">
								{currentDayEvents?.map((event, idx) => (
									<ViewEventPopover key={idx} event={event}>
										<div
											className="flex cursor-pointer items-center gap-2 rounded-md px-2"
											style={{
												backgroundColor: `${event.color}19`,
											}}
											title={event.title}
										>
											<div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: event.color }}></div>
											<span className="overflow-hidden text-ellipsis whitespace-nowrap">{event.title}</span>
										</div>
									</ViewEventPopover>
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

	return (
		<>
			<div className="grid w-full grid-cols-7 grid-rows-6 gap-px">{rows}</div>
		</>
	)
}
