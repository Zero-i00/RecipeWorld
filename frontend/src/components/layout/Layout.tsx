import React, { PropsWithChildren } from 'react'

import Header from '@/components/layout/header/Header'

import styles from './Layout.module.scss'

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className={styles.wrapper}>
			<Header />
			<main className={styles.main}>{children}</main>
		</div>
	)
}
