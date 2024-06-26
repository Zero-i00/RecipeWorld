import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/buttons/Button'
import Field from '@/components/ui/fields/Field'
import styles from '@/components/ui/forms/auth/AuthForm.module.scss'
import Heading from '@/components/ui/typeography/Heading'

import { PASSWORD_PATTERN } from '@/constants/regex.constants'

import { IRegisterForm } from '@/types/auth.types'

interface IRegisterFormProps {
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function RegisterForm({
	children,
	setIsLogin
}: PropsWithChildren<IRegisterFormProps>) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IRegisterForm>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IRegisterForm) => authService.register(data),
		onSuccess() {
			toast.success('Вы успешно зарегистрировались')
			setIsLogin(true)
			reset()
		},
		onError() {
			toast.error('Не удалось создать аккаунт')
		}
	})

	const onSubmit: SubmitHandler<IRegisterForm> = data => {
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

				<div className={`flex flex-row justify-between items-center`}>
					<Field
						className={`w-1/2`}
						{...register('firstName', {
							required: 'Поле является обязательным'
						})}
						error={errors.firstName}
						placeholder={'First Name'}
					/>
					<Field
						className={`w-1/2`}
						{...register('lastName', {
							required: 'Поле является обязательным'
						})}
						error={errors.lastName}
						placeholder={'Last Name'}
					/>
				</div>
				{children}
				<div className={styles['form-footer']}>
					<Button
						isLoading={isPending}
						type='submit'
						onClick={handleSubmit(onSubmit)}
					>
						Register
					</Button>
				</div>
			</form>
		</div>
	)
}
