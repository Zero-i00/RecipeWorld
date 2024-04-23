import cn from 'clsx'
import React from 'react'

import { IDivElement } from '@/components/elements/element.types'

import { IRecipe } from '@/types/recipe/recipe.types'

import styles from './FactsBadge.module.scss'

type TypeFactsBadgeProps = Pick<IRecipe, 'proteins' | 'fats' | 'carbs'>

export default function FactsBadge({
	item,
	className,
	...rest
}: IDivElement<TypeFactsBadgeProps>) {
	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<h1 className={styles.heading}>Nutrition Facts</h1>
			<div className={styles.content}>
				<div className={styles.item}>
					<h1 className={styles.title}>Proteins</h1>
					<h1 className={styles.value}>{item.proteins}</h1>
				</div>
				<div className={styles.item}>
					<h1 className={styles.title}>Fats</h1>
					<h1 className={styles.value}>{item.fats}</h1>
				</div>
				<div className={styles.item}>
					<h1 className={styles.title}>Carbs</h1>
					<h1 className={styles.value}>{item.carbs}</h1>
				</div>
			</div>
		</div>
	)
}
