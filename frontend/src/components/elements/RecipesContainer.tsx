import cn from 'clsx'
import React from 'react'

import { IDivElement } from '@/components/elements/element.types'
import RecipeCard from '@/components/elements/recipe-card/RecipeCard'
import Loader from '@/components/ui/Loader'

import { IRecipe } from '@/types/recipe/recipe.types'

import { useProfile } from '@/hooks/useProfile'

export default function RecipesContainer({
	item,
	className,
	...rest
}: IDivElement<IRecipe[]>) {
	if (item.length === 0) return

	const { data, isLoading } = useProfile()

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
				<img
					width={400}
					height={400}
					src='./storysets/empty-value.svg'
					alt='empty'
				/>
				<h1 className={`text-center text-2xl text-black font-bold`}>
					Profile not found
				</h1>
			</div>
		)
	}

	return (
		<div
			{...rest}
			className={cn(
				`w-full flex flex-row flex-wrap justify-between items-center`,
				className
			)}
		>
			{item.map(recipe => (
				<RecipeCard
					key={`recipe-item-${recipe.id}`}
					userId={data.data.id}
					item={recipe}
				/>
			))}
		</div>
	)
}
