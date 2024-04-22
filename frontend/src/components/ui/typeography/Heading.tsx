import React from 'react'

import styles from './Typeography.module.scss'

interface IHeading {
	title: string
}

export default function Heading({ title }: IHeading) {
	return (
		<div>
			<h1 className={styles.heading}>{title}</h1>
			<div className={styles.underline} />
		</div>
	)
}
