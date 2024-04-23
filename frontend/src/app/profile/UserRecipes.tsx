'use client'

import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import RecipesContainer from '@/components/elements/RecipesContainer'
import Loader from '@/components/ui/Loader'

interface IUserRecipeProps {
	userId: number
}

export default function UserRecipes({ userId }: IUserRecipeProps) {
	const { data, isLoading } = useQuery({
		queryKey: ['userRecipes', userId],
		queryFn: () => userService.getUserRecipesList(userId)
	})

	if (isLoading) {
		return (
			<div className={`w-full flex justify-center items-center`}>
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
					Не удалось найти ваши рецепты
				</h1>
			</div>
		)
	}

	if (data.data.length === 0) {
		return (
			<div className={`w-full flex flex-col justify-center items-center`}>
				<img
					width={400}
					height={400}
					src='./storysets/empty-value.svg'
					alt='empty'
				/>
				<h1 className={`text-center text-2xl text-black font-bold`}>
					У вас пока нет рецептов
				</h1>
			</div>
		)
	}

	return (
		<div>
			<div className={`w-1/4`}>
				<h1 className={`text-xl text-black font-bold my-12`}>Мои рецепты</h1>
			</div>
			<RecipesContainer item={data.data} />
		</div>
	)
}
