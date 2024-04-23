'use client'

import { recipeService } from '@/services/recipe/recipe.service'
import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import React, { useState } from 'react'

import { IDivElement } from '@/components/elements/element.types'
import { IRecipeElementProps } from '@/components/elements/recipe/recipe-elements.types'
import Loader from '@/components/ui/Loader'
import Checkbox from '@/components/ui/checkbox/Checkbox'

import { EnumIngredientUnit } from '@/types/ingredient.types'

import styles from './RecipeIngredients.module.scss'

export default function RecipeIngredients({
	item: { recipeId },
	className,
	...rest
}: IDivElement<IRecipeElementProps>) {
	const { data, isLoading } = useQuery({
		queryKey: ['ingredients', recipeId],
		queryFn: () => recipeService.getRecipeIngredientsList(recipeId)
	})
	const [isDoneArr, setIsDoneArr] = useState<number[]>([])

	if (isLoading) return <Loader />
	if (!data?.data || data.data.length === 0) return

	const toggleIngredientIsDone = (id: number) => {
		const isExist = isDoneArr.some(item => item === id)

		if (isExist)
			return setIsDoneArr(prev => [...prev.filter(item => item !== id)])

		return setIsDoneArr(prev => [...prev, id])
	}

	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<h1 className={styles.heading}>Ingredients:</h1>
			{data.data.map(ingredient => {
				const isExist = isDoneArr.some(item => item === ingredient.id)

				return (
					<div
						key={`ingredient-item-${ingredient.id}`}
						className={styles['ingredient-item']}
					>
						<button onClick={() => toggleIngredientIsDone(ingredient.id)}>
							<Checkbox isChecked={isExist} />
						</button>
						<h1
							className={cn(
								styles['ingredient-item-value'],
								`${isExist && 'line-through'}`
							)}
						>
							{ingredient.amount} {EnumIngredientUnit[ingredient.unit]}{' '}
							{ingredient.title}
						</h1>
					</div>
				)
			})}
		</div>
	)
}
