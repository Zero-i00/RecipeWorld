import { commentService } from '@/services/comment.service'
import { recipeService } from '@/services/recipe/recipe.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { Trash as TrashIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

import { IDivElement } from '@/components/elements/element.types'
import { IRecipeElementProps } from '@/components/elements/recipe/recipe-elements.types'
import Loader from '@/components/ui/Loader'
import CommentForm from '@/components/ui/forms/comment/CommentForm'

import { COLORS } from '@/constants/color.constants'

import { useProfile } from '@/hooks/useProfile'

import styles from './RecipeComments.module.scss'

export default function RecipeComments({
	item: { recipeId },
	className,
	...rest
}: IDivElement<IRecipeElementProps>) {
	const { data: userData, isLoading: userIsLoading } = useProfile()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['comments', recipeId],
		queryFn: () => recipeService.getRecipeCommentsList(recipeId)
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['comments', recipeId],
		mutationFn: (id: number) => commentService.deleteComment(id),
		onSuccess() {
			refetch()
			toast.success('Вы упешно удалили комментарий')
		},
		onError() {
			toast.error('ВНе удалось удалить комментарий')
		}
	})

	if (isLoading || userIsLoading) return <Loader />
	if (!data?.data || data.data.length === 0 || !userData?.data) return

	console.log(data.data[0].id, userData.data.id)

	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<h1 className={styles.heading}>Comments:</h1>
			{data.data.map(comment => (
				<div
					key={`comment-item-${comment.id}`}
					className={styles.comment}
				>
					<header className={styles.header}>
						<div
							className={`w-full flex flex-row justify-between items-center`}
						>
							<h1 className={styles.user}>{comment.userName}</h1>
							{+userData.data.id === comment.userId && (
								<button
									onClick={() => mutate(comment.id)}
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
						<p className={styles.data}>
							{Intl.DateTimeFormat('ru-RU', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							}).format(new Date(comment.created_at))}
						</p>
					</header>
					<div className={`my-4`}>
						<h1 className={`text-base text-black`}>{comment.title}</h1>
						<p className={styles.text}>{comment.text}</p>
					</div>
				</div>
			))}
			<CommentForm
				recipeId={recipeId}
				refetch={refetch}
			/>
		</div>
	)
}
