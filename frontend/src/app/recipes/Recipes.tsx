'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import RecipeCard from '@/components/elements/recipe-card/RecipeCard'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Heading from '@/components/ui/typeography/Heading'

import { useRecipes } from '@/hooks/useRecipes'

export default function Recipes() {
	const { data, isLoading } = useRecipes({ byRating: true })
	const { push } = useRouter()

	if (isLoading) {
		return (
			<div className={`loading-page`}>
				<Loader />
			</div>
		)
	}

	if (!data?.data || data.data.length === 0) {
		return (
			<div className={`loading-page`}>
				<img
					src='./storysets/empty-value.svg'
					alt='empty'
				/>
				<h1 className={`text-center text-2xl text-black font-bold`}>
					Ну удалось найти рецепты
				</h1>
			</div>
		)
	}

	return (
		<Layout>
			<div className={`w-1/4`}>
				<Heading title={`Selection`} />
			</div>
			<div className={`flex flex-row flex-wrap justify-between items-center`}>
				{data.data.map(recipe => (
					<RecipeCard
						key={`recipe-item-${recipe.id}`}
						item={recipe}
					/>
				))}
			</div>
		</Layout>
	)
}
