'use client'

import { recipeService } from '@/services/recipe/recipe.service'
import { useQuery } from '@tanstack/react-query'
import {
	Calendar as CalendarIcon,
	MessageCircleMore as MessageCircleMoreIcon
} from 'lucide-react'
import React from 'react'

import RecipeComments from '@/components/elements/recipe/comments/RecipeComments'
import FactsBadge from '@/components/elements/recipe/facts-badge/FactsBadge'
import RecipeIngredients from '@/components/elements/recipe/ingredients/RecipeIngredients'
import RecipeSteps from '@/components/elements/recipe/steps/RecipeSteps'
import TimeBadge from '@/components/elements/recipe/time-badge/TimeBadge'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Heading from '@/components/ui/typeography/Heading'

import { COLORS } from '@/constants/color.constants'

import styles from './Recipe.module.scss'

interface IRecipePageProps {
	id: string
}

export default function Recipe({ id }: IRecipePageProps) {
	const { data, isLoading } = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => recipeService.getRecipeById(+id)
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
					Не удалось найти рецепт
				</h1>
			</div>
		)
	}

	const recipe = data.data

	return (
		<Layout>
			<div className={styles.container}>
				<h1 className={styles.title}>{recipe.title}</h1>
				<div className={styles.info}>
					<div className={styles['info-item']}>
						<CalendarIcon
							width={20}
							height={20}
							color={COLORS.primary}
						/>
						<h1>
							{Intl.DateTimeFormat('ru-RU', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							}).format(new Date(recipe.createdAt))}
						</h1>
					</div>
					{recipe.comments && (
						<div className={styles['info-item']}>
							<MessageCircleMoreIcon
								width={20}
								height={20}
								color={COLORS.primary}
							/>
							<h1>{recipe.comments.length} comments</h1>
						</div>
					)}
				</div>
				<div>
					<Heading title={''} />
				</div>
				<div className={`w-full flex flex-row justify-between items-start`}>
					<div className={styles.content}>
						<img
							src={'/png/dish.jpg'}
							alt={recipe.title}
						/>
						<TimeBadge item={recipe} />
						<p className={styles.description}>{recipe.description}</p>
						<RecipeIngredients item={{ recipeId: recipe.id }} />
						<RecipeSteps item={{ recipeId: recipe.id }} />
						<RecipeComments item={{ recipeId: recipe.id }} />
					</div>
					<div className={`w-1/3`}>
						<FactsBadge item={recipe} />
					</div>
				</div>
			</div>
		</Layout>
	)
}
