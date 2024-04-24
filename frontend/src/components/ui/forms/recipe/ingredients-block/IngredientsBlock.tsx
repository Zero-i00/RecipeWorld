import cn from 'clsx'
import React from 'react'
import { toast } from 'sonner'

import { IDivElement } from '@/components/elements/element.types'
import { ingredientsData } from '@/components/ui/forms/recipe/ingredients-block/ingredients.data'

import { EnumIngredientUnit } from '@/types/ingredient.types'

import styles from './IngredientsBlock.module.scss'

export default function IngredientsBlock({
	className,
	...rest
}: IDivElement<unknown>) {
	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<h1 className={styles.heading}>Ingredients:</h1>
			{ingredientsData.map((ingredient, index) => (
				<button
					type={`button`}
					key={`ingredient-item-${ingredient.title}-${index}`}
					className={styles['ingredient-item']}
					onClick={() =>
						toast.info('It is not yet possible to customize recipe ingredients')
					}
				>
					{ingredient.amount} {EnumIngredientUnit[ingredient.unit || 0]}{' '}
					{ingredient.title}
				</button>
			))}
		</div>
	)
}
