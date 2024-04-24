'use client'

import { recipeService } from '@/services/recipe/recipe.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import RecipesContainer from '@/components/elements/RecipesContainer'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Search from '@/components/ui/search/Search'

interface ISearchProductProps {
	query: string
}

export default function SearchProducts({ query }: ISearchProductProps) {
	const { data, isLoading } = useQuery({
		queryKey: ['search', query],
		queryFn: () => recipeService.search(query)
	})

	if (isLoading) {
		return (
			<div className={`loading-page`}>
				<Loader />
			</div>
		)
	}

	if (!data?.data) {
		return (
			<div className={`w-full flex flex-col justify-center items-center`}>
				<img
					width={400}
					height={400}
					src='./storysets/empty-value.svg'
					alt='empty'
				/>
				<h1 className={`text-center text-2xl text-black font-bold`}>
					Not found any recipes
				</h1>
			</div>
		)
	}

	return (
		<Layout>
			<div className={`mb-8`}>
				<Search item={undefined} />
			</div>
			<RecipesContainer item={data.data} />
		</Layout>
	)
}
