import dayjs from 'dayjs'
import { produce } from 'immer'
import { useAtom } from 'jotai'
import { AlignLeft, Pencil, Trash2 } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { IconButton } from '../ui/iconbutton'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import AddEventPopover from './AddEventPopover'
import { IEvent, eventsStoreAtom } from './calender.utils'

export default function ViewEventPopover({ event, children }: { event?: IEvent | null; children: ReactNode }) {
	const [eventsStore, setEventsStore] = useAtom(eventsStoreAtom)
	const [open, setOpen] = useState(false)

	function handleDelete(eventId?: string) {
		if (eventId) {
			setEventsStore(
				produce((draft: IEvent[]) => {
					const idx = draft?.findIndex((e) => e.id === eventId)
					draft.splice(idx, 1)
				}),
			)
			setOpen(false)
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent align="start" side="right" className="w-96 space-y-2">
				<div className="flex flex-1 items-start gap-4">
					<div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: event?.color ?? '#eeeeee' }}></div>

					<div>
						<h2 className="font-semibold leading-snug">{event?.title}</h2>
						<p className="mt-0.5 text-sm">{dayjs(event?.date).format('dddd, DD MMM')}</p>
					</div>
				</div>

				{event?.notes ? (
					<div className="flex items-start gap-3">
						<AlignLeft className="mt-0.5 h-4 w-4 flex-shrink-0" />
						<p className="text-sm">{event.notes}</p>
					</div>
				) : null}

				<div className="mt-1 flex justify-end">
					<AddEventPopover isEdit={true} initialData={event}>
						<IconButton>
							<Pencil className="h-4 w-4 cursor-pointer text-primary" />
						</IconButton>
					</AddEventPopover>

					<IconButton onClick={() => handleDelete(event?.id)}>
						<Trash2 className="h-4 w-4 cursor-pointer text-destructive" />
					</IconButton>
				</div>
			</PopoverContent>
		</Popover>
	)
}
