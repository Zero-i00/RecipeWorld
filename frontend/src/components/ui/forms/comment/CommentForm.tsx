import { commentService } from '@/services/comment.service'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IRecipeElementProps } from '@/components/elements/recipe/recipe-elements.types'
import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/buttons/Button'
import Field from '@/components/ui/fields/Field'
import TextAreaField from '@/components/ui/fields/TextArea'

import { TypeCommentFormState } from '@/types/comment.types'

import { useProfile } from '@/hooks/useProfile'

import styles from './CommetnForm.module.scss'

interface ICommentFormProps extends IRecipeElementProps {
	refetch: () => {}
}

export default function CommentForm({ recipeId, refetch }: ICommentFormProps) {
	const { data, isLoading } = useProfile()

	const { mutate, isPending } = useMutation({
		mutationKey: ['comments'],
		mutationFn: (data: TypeCommentFormState) =>
			commentService.createComment(data),
		onSuccess() {
			refetch()
			toast.success('Ваш комментарий создан')
			reset()
		},
		onError() {
			toast.error('Ваш комментарий создан')
		}
	})

	if (isLoading) return <Loader />
	if (!data?.data) return

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeCommentFormState>({
		mode: 'onChange',
		defaultValues: {
			userId: data.data.id,
			recipeId: recipeId
		}
	})

	const onSubmit: SubmitHandler<TypeCommentFormState> = data => {
		mutate(data)
	}

	return (
		<form className={styles['comment-form']}>
			<h1 className={styles.title}>Rate this recipe and share your options</h1>
			<Field
				{...register('title', {
					required: 'Поле являеться обязательным'
				})}
				placeholder={`Title`}
				error={errors.title}
			/>
			<TextAreaField
				{...register('text', {
					required: 'Поле являеться обязательным'
				})}
				placeholder={`Description`}
				error={errors.title}
			/>
			<div className={`flex flex-row justify-end items-center`}>
				<Button
					type={`button`}
					isLoading={isPending}
					onClick={handleSubmit(onSubmit)}
				>
					Post
				</Button>
			</div>
		</form>
	)
}
