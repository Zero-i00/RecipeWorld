import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
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

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IRegisterForm) => authService.register(data),
		onSuccess() {
			toast.success('Вы успешно зарегистрировались')
			setIsLogin(true)
			reset()
		}
	})

	const onSubmit: SubmitHandler<IRegisterForm> = data => {
		mutate(data)
	}

	return (
		<div className={styles.container}>
			<form>
				<div className={`my-8`}>
					<Heading title={`Авторизация`} />
				</div>

				<Field
					{...register('username', {
						required: 'Поле является обязательным'
					})}
					error={errors.username}
					placeholder={'Логин'}
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
					placeholder={'Пароль'}
				/>

				<div className={`flex flex-row justify-between items-center`}>
					<Field
						className={`w-1/2`}
						{...register('firstName', {
							required: 'Поле является обязательным'
						})}
						error={errors.firstName}
						placeholder={'Имя'}
					/>
					<Field
						className={`w-1/2`}
						{...register('lastName', {
							required: 'Поле является обязательным'
						})}
						error={errors.lastName}
						placeholder={'Фамилия'}
					/>
				</div>
				{children}
				<div className={styles['form-footer']}>
					<Button
						type='submit'
						onClick={handleSubmit(onSubmit)}
					>
						Зарегистрироваться
					</Button>
				</div>
			</form>
		</div>
	)
}
