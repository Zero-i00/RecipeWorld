import { recipeService } from '@/services/recipe/recipe.service'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { Timer as TimerIcon, Trash as TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import { IDivElement } from '@/components/elements/element.types'
import Loader from '@/components/ui/Loader'

import { COLORS } from '@/constants/color.constants'

import { IRecipe } from '@/types/recipe/recipe.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from './RecipeCard.module.scss'

interface IRecipeCardProps extends IDivElement<IRecipe> {
	userId: number
}

export default function RecipeCard({
	item,
	userId,
	className,
	...rest
}: IRecipeCardProps) {
	const { push } = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['recipe', item.id],
		mutationFn: (id: number) => recipeService.deleteRecipe(id),
		onSuccess() {
			toast.success('Recipe has been deleted successfully')
		},
		onError() {
			toast.error('Error deleting recipe')
		}
	})

	if (isPending) return <Loader />

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
				<div
					className={`z-10 w-full flex flex-row justify-between items-center`}
				>
					<h1
						onClick={() =>
							!isPending && push(`${DASHBOARD_PAGES.RECIPES}/${item.id}`)
						}
						className={styles.title}
					>
						{item.title}
					</h1>
					{+userId === item.userId && (
						<button
							onClick={() => mutate(item.id)}
							disabled={isPending}
						>
							<TrashIcon
								width={20}
								height={20}
								color={COLORS.black}
							/>
						</button>
					)}
				</div>
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
