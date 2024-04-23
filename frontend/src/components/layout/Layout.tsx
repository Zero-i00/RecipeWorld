import cn from 'clsx'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import Header from '@/components/layout/header/Header'

import styles from './Layout.module.scss'

type TypeLayoutProps = HTMLAttributes<HTMLDivElement>

export default function Layout({
	children,
	className,
	...rest
}: PropsWithChildren<TypeLayoutProps>) {
	return (
		<div className={cn(styles.wrapper, className)}>
			<Header />
			<main className={styles.main}>{children}</main>
		</div>
	)
}
