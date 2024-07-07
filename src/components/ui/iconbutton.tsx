import { cn } from '@/lib/utils'
import React, { ReactNode, forwardRef } from 'react'

export interface IIconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IIconButton>((props, ref) => {
	const { id, children, className, ...rest } = props
	return (
		<button
			ref={ref}
			id={id}
			{...rest}
			className={cn('grid h-8 w-8 place-content-center rounded-full opacity-100 hover:bg-muted hover:opacity-100 focus:outline-none', className)}
		>
			{children}
		</button>
	)
})

IconButton.displayName = 'IconButton'
