'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/buttons/Button'

import { useProfile } from '@/hooks/useProfile'

import styles from './Header.module.scss'

const Header = () => {
	const { data, isLoading } = useProfile()
	const { push } = useRouter()
	return (
		<header className={styles.header}>
			<h1>
				<span>Recipe</span> World
			</h1>
			{isLoading ? (
				<Loader />
			) : data?.data?.username ? (
				<button
					onClick={() => push('/profile')}
					className={styles.profile}
				>
					{data.data.firstName && data.data.lastName
						? `${data.data.firstName} ${data.data.lastName}`
						: data.data.username}
				</button>
			) : (
				<Button onClick={() => push('/auth')}>Войти</Button>
			)}
		</header>
	)
}

export default Header
