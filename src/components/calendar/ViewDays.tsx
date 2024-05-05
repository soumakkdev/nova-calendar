import { dayFormat, now } from './calender.utils'

export default function ViewDays() {
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
