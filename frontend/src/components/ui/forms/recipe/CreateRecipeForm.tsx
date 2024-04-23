import { recipeService } from '@/services/recipe/recipe.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/buttons/Button'
import Field from '@/components/ui/fields/Field'
import IngredientsBlock from '@/components/ui/forms/recipe/ingredients-block/IngredientsBlock'
import InstructionBlock from '@/components/ui/forms/recipe/instruction-block/InstructionBlock'

import { TypeRecipeFormState } from '@/types/recipe/recipe.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from './CreateRecipeForm.module.scss'

export interface ICreateRecipeFormProps {
	userId: number
}

export default function CreateRecipeForm({ userId }: ICreateRecipeFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeRecipeFormState>({
		mode: 'onChange',
		defaultValues: {
			image:
				'https://wp-s.ru/wallpapers/4/19/484422327835664/dish-with-round-potatoes-steak-and-herbs.jpg',
			userId: userId,
			cuisineId: null
		}
	})

	const { push } = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['recipe'],
		mutationFn: (data: TypeRecipeFormState) => recipeService.createRecipe(data),
		onSuccess() {
			toast.success('Recipe successfully created')
			reset()
			push(DASHBOARD_PAGES.PROFILE)
		},
		onError() {
			toast.error('Failed to create recipe')
		}
	})

	const onSubmit: SubmitHandler<TypeRecipeFormState> = data => {
		mutate(data)
	}

	return (
		<form className={styles['create-recipe-form']}>
			<header className={styles['form-header']}>
				<h1>Create new Recipe</h1>
				<Button
					type={`button`}
					onClick={handleSubmit(onSubmit)}
				>
					Save
				</Button>
			</header>
			<div className={styles.content}>
				<div className={styles.field}>
					<h1 className={styles['field-title']}>Recipe Title:</h1>
					<Field
						{...register('title', {
							required: 'This field is required'
						})}
						placeholder={`Title`}
						error={errors.title}
					/>
				</div>
				<div className={styles.field}>
					<h1 className={styles['field-title']}>Recipe image:</h1>
					<button
						type={`button`}
						onClick={() =>
							toast.info(
								'It is currently not possible to attach a picture to a recipe.'
							)
						}
					>
						<img
							src='https://wp-s.ru/wallpapers/4/19/484422327835664/dish-with-round-potatoes-steak-and-herbs.jpg'
							alt='recipe image'
						/>
					</button>
				</div>
				<div className={styles.field}>
					<h1 className={styles['field-title']}>Description:</h1>
					<Field
						{...register('description', {
							required: 'This field is required'
						})}
						placeholder={`Description`}
						error={errors.description}
					/>
				</div>
				<IngredientsBlock userId={userId} />
				<InstructionBlock userId={userId} />

				<div className={styles.field}>
					<h1 className={styles['field-title']}>Serving:</h1>
					<Field
						{...register('serving', {
							required: 'This field is required'
						})}
						isNumber
						placeholder={`Serving`}
						error={errors.serving}
					/>
				</div>
				<div className={`flex flex-row justify-between items-center`}>
					<div className={styles.field}>
						<h1 className={styles['field-title']}>Prep Time:</h1>
						<Field
							{...register('prepTime', {
								required: 'This field is required'
							})}
							isNumber
							placeholder={`Prep time`}
							error={errors.prepTime}
						/>
					</div>
					<div className={styles.field}>
						<h1 className={styles['field-title']}>Cook Time:</h1>
						<Field
							{...register('cookTime', {
								required: 'This field is required'
							})}
							isNumber
							placeholder={`Cook time`}
							error={errors.cookTime}
						/>
					</div>
				</div>
				<div className={styles.field}>
					<h1 className={styles['field-title']}>Proteins:</h1>
					<Field
						{...register('proteins', {
							required: 'This field is required'
						})}
						isNumber
						placeholder={`Proteins`}
						error={errors.proteins}
					/>
				</div>
				<div className={`flex flex-row justify-between items-center`}>
					<div className={styles.field}>
						<h1 className={styles['field-title']}>Carbs:</h1>
						<Field
							{...register('carbs', {
								required: 'This field is required'
							})}
							isNumber
							placeholder={`Carbs`}
							error={errors.prepTime}
						/>
					</div>
					<div className={styles.field}>
						<h1 className={styles['field-title']}>Fats:</h1>
						<Field
							{...register('fats', {
								required: 'This field is required'
							})}
							isNumber
							placeholder={`Fats`}
							error={errors.fats}
						/>
					</div>
				</div>
			</div>
		</form>
	)
}
