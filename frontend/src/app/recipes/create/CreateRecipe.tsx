'use client'

import React from 'react'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import CreateRecipeForm from '@/components/ui/forms/recipe/CreateRecipeForm'

import { useProfile } from '@/hooks/useProfile'

export default function CreateRecipe() {
	const { data, isLoading } = useProfile()

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
			<CreateRecipeForm userId={data.data.id} />
		</Layout>
	)
}
