'use client'

import { recipeService } from '@/services/recipe/recipe.service'
import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import React from 'react'

import { IDivElement } from '@/components/elements/element.types'
import { IRecipeElementProps } from '@/components/elements/recipe/recipe-elements.types'
import Loader from '@/components/ui/Loader'

import styles from './RecipeSteps.module.scss'

export default function RecipeSteps({
	item: { recipeId },
	className,
	...rest
}: IDivElement<IRecipeElementProps>) {
	const { data, isLoading } = useQuery({
		queryKey: ['steps', recipeId],
		queryFn: () => recipeService.getRecipeStepsList(recipeId)
	})

	if (isLoading) return <Loader />
	if (!data?.data || data.data.length === 0) return

	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<h1 className={styles.heading}>Instructions:</h1>
			{data.data.map(step => (
				<div
					className={styles['step-item']}
					key={`steo-item-${step.id}`}
				>
					<div className={styles[`step-order`]}>
						<p>{step.step}</p>
					</div>
					<h1 className={styles['step-item-value']}>{step.text}</h1>
				</div>
			))}
		</div>
	)
}
