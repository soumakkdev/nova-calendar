import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface IDatePicker {
	id: string
	value: Date
	onChange: (date?: Date) => void
	onBlur?: () => void
}

export function DatePicker({ value, onChange, ...rest }: IDatePicker) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button {...rest} variant={'outline'} className={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? format(value, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={value} onSelect={(date) => onChange(date)} initialFocus />
			</PopoverContent>
		</Popover>
	)
}
