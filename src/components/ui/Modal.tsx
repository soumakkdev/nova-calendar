import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './dialog'

interface IModal {
	open: boolean
	onClose: () => void
	children: ReactNode
}

export default function Modal(props: IModal) {
	const { onClose, open, children } = props
	return (
		<Dialog open={open} onOpenChange={() => onClose()}>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	)
}

function ModalHeader({ title }: { title: string }) {
	return (
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
		</DialogHeader>
	)
}

Modal.Header = ModalHeader
Modal.Footer = DialogFooter
