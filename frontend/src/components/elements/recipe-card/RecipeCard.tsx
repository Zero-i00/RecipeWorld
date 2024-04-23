import cn from 'clsx'
import { Timer as TimerIcon } from 'lucide-react'
import React from 'react'

import { IDivElement } from '@/components/elements/element.types'

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
			className={cn(styles.card)}
		>
			<img
				src={'./png/dish.jpg'}
				alt={item.title}
			/>
			<div className={styles.body}>
				<h1 className={styles.title}>{item.title}</h1>
				<p className={styles.description}>
					{item.description.length > 35
						? `${item.description.slice(0, 35)}...`
						: item.description}
				</p>
				<div className={styles['cook-time-container']}>
					<TimerIcon
						width={24}
						height={24}
					/>
					<h2>{item.cookTime} мин</h2>
				</div>
			</div>
		</div>
	)
}
