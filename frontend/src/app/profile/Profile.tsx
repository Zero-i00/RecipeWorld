'use client'

import UserRecipes from '@/app/profile/UserRecipes'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/buttons/Button'
import UserForm from '@/components/ui/forms/user/UserForm'

import { useProfile } from '@/hooks/useProfile'

export default function Profile() {
	const { data, isLoading } = useProfile()
	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout()
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
			<div className={`loading-page`}>
				<img
					width={400}
					height={400}
					src='./storysets/empty-value.svg'
					alt='empty'
				/>
				<h1 className={`text-center text-2xl text-black font-bold`}>
					Не удалось найти ваш профиль
				</h1>
			</div>
		)
	}

	return (
		<Layout>
			<UserForm />
			<div className={'w-[400px] my-4'}>
				<Button
					onClick={() => mutate()}
					isLoading={isPending}
					variant={`inline`}
				>
					Выйти
				</Button>
			</div>
			<UserRecipes userId={data.data.id} />
		</Layout>
	)
}
