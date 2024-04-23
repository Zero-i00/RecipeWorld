import cn from 'clsx'
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import Loader from '@/components/ui/Loader'

import styles from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'inline'
	isLoading?: boolean
}

export default function Button({
	children,
	className,
	variant = 'primary',
	isLoading = false,
	...rest
}: PropsWithChildren<IButtonProps>) {
	return (
		<button
			{...rest}
			disabled={isLoading}
			className={cn(styles[variant])}
		>
			{isLoading ? <Loader /> : children}
		</button>
	)
}
