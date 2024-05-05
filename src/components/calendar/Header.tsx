import dayjs, { Dayjs } from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { dateFormat } from './calender.utils'

export default function Header({ currentMonth, onChangeCurrentMonth }: { currentMonth: Dayjs; onChangeCurrentMonth: (day: Dayjs) => void }) {
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
