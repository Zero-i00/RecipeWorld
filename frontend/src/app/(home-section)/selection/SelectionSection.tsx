'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import RecipeCard from '@/components/elements/recipe-card/RecipeCard'
import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/buttons/Button'
import Heading from '@/components/ui/typeography/Heading'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useRecipes } from '@/hooks/useRecipes'

import styles from './SelectionSection.module.scss'

export default function SelectionSection() {
	const { data, isLoading } = useRecipes({ byRating: true })
	const { push } = useRouter()

	if (isLoading) {
		return (
			<div className={`flex justify-center items-center`}>
				<Loader />
			</div>
		)
	}

	if (!data?.data || data.data.length === 0) return

	return (
		<section
			id={`selection`}
			className={styles.container}
		>
			<div className={`w-1/4`}>
				<Heading title={`Beast Recipe`} />
			</div>
			<div className={styles['card-wrapper']}>
				{data.data.slice(0, 6).map(recipe => (
					<RecipeCard
						key={`recipe-item-${recipe.id}`}
						item={recipe}
					/>
				))}
			</div>
			<div className={`flex justify-center py-12`}>
				<Button
					className={`mx-auto`}
					onClick={() => push(DASHBOARD_PAGES.RECIPES)}
				>
					View all recipes
				</Button>
			</div>
		</section>
	)
}
