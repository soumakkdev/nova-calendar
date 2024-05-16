import { useForm } from '@tanstack/react-form'
import { DatePicker } from '../ui/DatePicker'
import Modal from '../ui/Modal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { IEvent, eventsStoreAtom } from './calender.utils'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import { CirclePicker } from 'react-color'
import { useAtom } from 'jotai'
import { produce } from 'immer'

export default function SaveEventModal({
	isEdit,
	initialData,
	open,
	onClose,
}: {
	isEdit?: boolean
	initialData?: IEvent | null
	open: boolean
	onClose: () => void
}) {
	const [eventsStore, setEventsStore] = useAtom(eventsStoreAtom)

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
			onClose()
		},
	})

	function handleDelete() {
		if (initialData) {
			setEventsStore(
				produce((draft: IEvent[]) => {
					const idx = draft?.findIndex((e) => e.id === initialData.id)
					draft.splice(idx, 1)
				}),
			)
			onClose()
		}
	}

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

				<Modal.Footer className="sm:justify-between">
					{isEdit ? (
						<Button variant="ghost" onClick={handleDelete}>
							Delete
						</Button>
					) : (
						<div></div>
					)}
					<Button>Save</Button>
				</Modal.Footer>
			</form>
		</Modal>
	)
}
