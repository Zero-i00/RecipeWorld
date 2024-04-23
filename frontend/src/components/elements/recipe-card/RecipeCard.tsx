import cn from 'clsx'
import { Timer as TimerIcon } from 'lucide-react'
import React from 'react'

import { IDivElement } from '@/components/elements/element.interfaces'

import { IRecipe } from '@/types/recipe/recipe.types'

import styles from './RecipeCard.module.scss'

export default function RecipeCard({
	item,
	className,
	...rest
}: IDivElement<IRecipe>) {
	return (
		<div
			{...rest}
			className={cn(styles.card, className)}
		>
			<div className={styles['img-container']}>
				<img
					src={item.image}
					alt={item.title}
				/>
			</div>
			<div className={styles.body}>
				<h1 className={styles.title}>{item.title}</h1>
				<p className={styles.description}>{item.description.slice(0, 40)}...</p>
				<div className={styles['cook-time-container']}>
					<TimerIcon />
					<h2>{item.cookTime} мин.</h2>
				</div>
			</div>
		</div>
	)
}
