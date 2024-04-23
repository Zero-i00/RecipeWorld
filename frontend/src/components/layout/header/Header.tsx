'use client'

import { HandPlatter as HandPlatterIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUrl } from 'nextjs-current-url'
import React from 'react'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/buttons/Button'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './Header.module.scss'

const Header = () => {
	const { data, isLoading } = useProfile()
	const { push } = useRouter()
	const { href: currentUrl } = useUrl() ?? {}

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href={`/`}>
					<HandPlatterIcon
						width={32}
						height={32}
					/>
					<h1>
						<span>Recipe</span> World
					</h1>
				</Link>
			</div>
			{currentUrl === 'http://localhost:3000/' && (
				<nav>
					<ul>
						<li>
							<a href='/'>Home</a>
						</li>
						<li>
							<a href='#about'>About</a>
						</li>
						<li>
							<Link href={DASHBOARD_PAGES.RECIPES}>Selection</Link>
						</li>
						{data?.data?.username && (
							<li>
								<Link href={DASHBOARD_PAGES.PROFILE}>My Recipes</Link>
							</li>
						)}
					</ul>
				</nav>
			)}
			{isLoading ? (
				<Loader />
			) : data?.data?.username ? (
				<button
					onClick={() => push('/profile')}
					className={styles.profile}
				>
					{data.data.username}
				</button>
			) : (
				<Button
					variant={`inline`}
					onClick={() => push('/auth')}
				>
					Войти
				</Button>
			)}
		</header>
	)
}

export default Header
