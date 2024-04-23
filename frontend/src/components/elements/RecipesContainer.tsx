import cn from 'clsx'
import React from 'react'

import { IDivElement } from '@/components/elements/element.types'
import RecipeCard from '@/components/elements/recipe-card/RecipeCard'

import { IRecipe } from '@/types/recipe/recipe.types'

export default function RecipesContainer({
	item,
	className,
	...rest
}: IDivElement<IRecipe[]>) {
	if (item.length === 0) return

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
					item={recipe}
				/>
			))}
		</div>
	)
}
