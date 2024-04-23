'use client'

import React from 'react'

import RecipesContainer from '@/components/elements/RecipesContainer'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Heading from '@/components/ui/typeography/Heading'

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

	if (!data?.data || data.data.length === 0) {
		return (
			<div className={`loading-page`}>
				<img
					width={400}
					height={400}
					src='./storysets/empty-value.svg'
					alt='empty'
				/>
				<h1 className={`text-center text-2xl text-black font-bold`}>
					Не удалось найти рецепты
				</h1>
			</div>
		)
	}

	return (
		<Layout>
			<div className={`w-1/4`}>
				<Heading title={`Selection`} />
			</div>
			<RecipesContainer item={data.data} />
		</Layout>
	)
}
