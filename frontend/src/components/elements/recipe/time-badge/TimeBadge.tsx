import cn from 'clsx'
import React from 'react'

import { IDivElement } from '@/components/elements/element.types'

import { IRecipe } from '@/types/recipe/recipe.types'

import styles from './TimeBadge.module.scss'

type TypeTimeBadgeProps = Pick<IRecipe, 'prepTime' | 'cookTime' | 'serving'>

export default function TimeBadge({
	item,
	className,
	...rest
}: IDivElement<TypeTimeBadgeProps>) {
	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<div className={styles.item}>
				<h1>Prep time:</h1>
				<p>{item.prepTime}</p>
			</div>
			<div className={styles.item}>
				<h1>Cook time:</h1>
				<p>{item.cookTime}</p>
			</div>
			<div className={styles.item}>
				<h1>Serving:</h1>
				<p>{item.serving}</p>
			</div>
		</div>
	)
}
