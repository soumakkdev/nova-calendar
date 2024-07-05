import { useForm } from '@tanstack/react-form'
import dayjs from 'dayjs'
import { produce } from 'immer'
import { useAtom } from 'jotai'
import { nanoid } from 'nanoid'
import { ReactNode, useState } from 'react'
import { CirclePicker } from 'react-color'
import { DatePicker } from '../ui/DatePicker'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Textarea } from '../ui/textarea'
import { IEvent, eventsStoreAtom } from './calender.utils'

export default function AddEventPopover({ isEdit, initialData, children }: { isEdit?: boolean; initialData?: IEvent | null; children: ReactNode }) {
	const [eventsStore, setEventsStore] = useAtom(eventsStoreAtom)
	const [open, setOpen] = useState(false)

	const form = useForm({
		defaultValues: {
			title: initialData?.title ?? '',
			date: initialData?.date ?? new Date().toISOString(),
			notes: initialData?.notes ?? '',
			color: initialData?.color ?? '',
		},
		onSubmit: async ({ value }) => {
			if (isEdit && initialData) {
				setEventsStore(
					produce((draft: IEvent[]) => {
						const idx = draft?.findIndex((e) => e.id === initialData.id)
						draft.splice(idx, 1, {
							...initialData,
							...value,
						})
					}),
				)
			} else {
				setEventsStore(
					produce((draft) => {
						draft.push({
							...value,
							id: nanoid(10),
						})
					}),
				)
			}
			setOpen(false)
		},
	})

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent align="start" side="right">
				<form
					className="space-y-3"
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<p className="font-semibold">Create Event</p>

					<form.Field name="title">
						{(field) => (
							<Input
								id={field.name}
								value={field.state.value}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Event name"
							/>
						)}
					</form.Field>

					<form.Field name="date">
						{(field) => (
							<DatePicker
								id={field.name}
								value={dayjs(field.state.value).toDate()}
								onBlur={field.handleBlur}
								onChange={(date) => field.handleChange(dayjs(date).toISOString())}
							/>
						)}
					</form.Field>

					<form.Field name="color">
						{(field) => <CirclePicker color={field.state.value} onChangeComplete={(color) => field.handleChange(color.hex)} />}
					</form.Field>

					<form.Field name="notes">
						{(field) => (
							<Textarea
								id={field.name}
								value={field.state.value}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Notes"
							/>
						)}
					</form.Field>

					<div className="flex justify-end">
						<Button size="sm">Save</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	)
}
