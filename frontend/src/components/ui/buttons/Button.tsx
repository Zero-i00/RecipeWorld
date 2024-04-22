import cn from 'clsx'
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import styles from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'inline'
}

export default function Button({
	children,
	className,
	variant = 'primary',
	...rest
}: PropsWithChildren<IButtonProps>) {
	return (
		<button
			{...rest}
			className={cn(styles[variant])}
		>
			{children}
		</button>
	)
}
