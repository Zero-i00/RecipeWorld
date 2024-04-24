'use client'

import cn from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { IDivElement } from '@/components/elements/element.types'

import styles from './Search.module.scss'

export default function Search({ className, ...rest }: IDivElement<unknown>) {
	const [value, setValue] = useState('')
	const { push } = useRouter()

	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<input
				className={styles.search}
				type='text'
				onChange={e => setValue(e.target.value)}
				value={value}
				placeholder={`Я хочу найти`}
			/>
			<button
				onClick={() => value.length > 0 && push(`/search/${value}`)}
				className={styles.find}
			>
				Найти
			</button>
		</div>
	)
}
