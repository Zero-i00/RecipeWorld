'use client'

import UserRecipes from '@/app/profile/UserRecipes'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/buttons/Button'
import UserForm from '@/components/ui/forms/user/UserForm'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useProfile } from '@/hooks/useProfile'

export default function Profile() {
	const { data, isLoading } = useProfile()
	const { push } = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['profile', 'logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			toast.success('Вы успешно вышли из системы')
			push('/')
		}
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
					Profile not found
				</h1>
			</div>
		)
	}

	return (
		<Layout>
			<UserForm />
			<div className={'w-[400px] my-4 flex flex-col gap-4'}>
				<Button
					variant={`inline`}
					onClick={() => push(DASHBOARD_PAGES.CREATE_RECIPE)}
				>
					Create Recipe
				</Button>
				<Button
					onClick={() => mutate()}
					isLoading={isPending}
					variant={`inline`}
				>
					Logout
				</Button>
			</div>
			<UserRecipes userId={data.data.id} />
		</Layout>
	)
}
