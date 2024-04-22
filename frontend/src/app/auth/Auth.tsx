'use client'

import { useState } from 'react'

import LoginForm from '@/components/ui/forms/auth/LoginForm'
import RegisterForm from '@/components/ui/forms/auth/RegisterForm'

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true)

	return isLogin ? <LoginForm /> : <RegisterForm />
}
