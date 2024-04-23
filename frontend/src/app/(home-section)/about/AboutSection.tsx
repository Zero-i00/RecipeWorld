'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import Button from '@/components/ui/buttons/Button'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from './AboutSection.module.scss'

export default function AboutSection() {
	const { push } = useRouter()

	return (
		<section
			id={`about`}
			className={styles.container}
		>
			<img
				src='./png/phone-photo.png'
				alt='photo'
			/>
			<div className={styles.content}>
				<h1 className={styles.title}>
					Share your
					<span> Recipes</span>
				</h1>
				<p className={styles.description}>
					Share your recipes with other people, get feedback and improve your
					culinary skills.
					<br />
					What recipe will you tell us about today?
				</p>
				<Button onClick={() => push(DASHBOARD_PAGES.CREATE_RECIPE)}>
					Create New Recipe
				</Button>
			</div>
		</section>
	)
}
