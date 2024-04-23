'use client'

import React from 'react'

import RecipeCard from '@/components/elements/recipe-card/RecipeCard'
import Loader from '@/components/ui/Loader'

import { useRecipes } from '@/hooks/useRecipes'

export default function Recipes() {
	const { data, isLoading } = useRecipes({ byRating: true })

	if (isLoading) {
		return (
			<div className={`loading-page`}>
				<Loader />
			</div>
		)
	}

	if (!data?.data) {
		return (
			<div className={`loading-page`}>
				<h1>Здесь пока нет рецептов</h1>
			</div>
		)
	}

	return (
		<div className={`flex flex-row flex-wrap justify-between gap-12`}>
			{data?.data.map(recipe => (
				<RecipeCard
					key={`recipe-item-${recipe.id}`}
					item={recipe}
				/>
			))}
		</div>
	)
}
