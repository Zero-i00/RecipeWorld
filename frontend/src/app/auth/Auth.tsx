'use client'

import { useState } from 'react'

import styles from '@/components/ui/forms/auth/AuthForm.module.scss'
import LoginForm from '@/components/ui/forms/auth/LoginForm'
import RegisterForm from '@/components/ui/forms/auth/RegisterForm'

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true)

	return isLogin ? (
		<LoginForm>
			<button
				className={styles['change-form-btn']}
				onClick={() => setIsLogin(false)}
			>
				У меня нет аккаунта
			</button>
		</LoginForm>
	) : (
		<RegisterForm setIsLogin={setIsLogin}>
			<button
				className={styles['change-form-btn']}
				onClick={() => setIsLogin(true)}
			>
				У меня есть аккаунт
			</button>
		</RegisterForm>
	)
}
