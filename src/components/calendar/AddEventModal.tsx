import { useForm } from '@tanstack/react-form'
import { DatePicker } from '../ui/DatePicker'
import Modal from '../ui/Modal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { IEvent } from './calender.utils'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'

export default function AddEventModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: (data: IEvent) => void }) {
	const form = useForm({
		defaultValues: {
			title: '',
			date: new Date().toISOString(),
			notes: '',
		},
		onSubmit: async ({ value }) => {
			onConfirm({
				...value,
				id: nanoid(10),
			})
			onClose()
		},
	})

	return (
		<Modal open={open} onClose={onClose}>
			<form
				className="space-y-5"
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<Modal.Header title="Create Event" />

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
							name={field.name}
							onBlur={field.handleBlur}
							onChange={(date) => field.handleChange(dayjs(date).toISOString())}
						/>
					)}
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

				<Modal.Footer>
					<Button>Save</Button>
				</Modal.Footer>
			</form>
		</Modal>
	)
}
