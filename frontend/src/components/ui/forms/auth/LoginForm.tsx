import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/buttons/Button'
import Field from '@/components/ui/fields/Field'
import Heading from '@/components/ui/typeography/Heading'

import { PASSWORD_PATTERN } from '@/constants/regex.constants'

import { ILoginFrom } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from './AuthForm.module.scss'

export default function LoginForm({ children }: PropsWithChildren) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ILoginFrom>({
		mode: 'onChange'
	})

	const { push } = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: ILoginFrom) => authService.login(data),
		onSuccess() {
			toast.success('Вы успешно авторизировались')
			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError() {
			toast.error('Не удалось авторизироваться')
		}
	})

	const onSubmit: SubmitHandler<ILoginFrom> = data => {
		mutate(data)
	}

	return (
		<div className={styles.container}>
			<form>
				<div className={`my-8`}>
					<Heading title={`Authorization`} />
				</div>

				<Field
					{...register('username', {
						required: 'Поле является обязательным'
					})}
					error={errors.username}
					placeholder={'Login'}
				/>

				<Field
					{...register('password', {
						required: 'Поле является обязательным',
						pattern: {
							value: PASSWORD_PATTERN,
							message: 'Пароль слишко лёгкий'
						}
					})}
					type={`password`}
					error={errors.password}
					placeholder={'Password'}
				/>
				{children}
				<div className={styles['form-footer']}>
					<button></button>
					<Button
						isLoading={isPending}
						type='submit'
						onClick={handleSubmit(onSubmit)}
					>
						Login
					</Button>
				</div>
			</form>
		</div>
	)
}
