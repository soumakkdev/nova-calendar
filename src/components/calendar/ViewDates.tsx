import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { IFormattedDateObj } from './calender.utils'

export default function ViewDates({ arrayOfDays }: { arrayOfDays: IFormattedDateObj[][] }) {
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
