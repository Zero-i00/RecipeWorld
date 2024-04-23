'use client'

import { userService } from '@/services/user.service'
import { useMutation } from '@tanstack/react-query'
import { CircleUserRound as CircleUserRoundIcon } from 'lucide-react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/buttons/Button'
import Field from '@/components/ui/fields/Field'

import type { TypeUserFormState } from '@/types/user.types'

import { useProfile } from '@/hooks/useProfile'

import styles from './UserForm.module.scss'

export default function UserForm() {
	const { data, isLoading, refetch } = useProfile()

	if (isLoading) {
		return (
			<div className={`w-full flex justify-center items-center`}>
				<Loader />
			</div>
		)
	}

	if (!data?.data) return

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<TypeUserFormState>({
		mode: 'onChange',
		defaultValues: { ...data.data }
	})

	const [isEdit, setIsEdit] = useState(false)
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['profile'],
		mutationFn: (query: TypeUserFormState) =>
			userService.updateUser(data.data.id, query),
		onSuccess() {
			toast.success('Данне пользовотеля успешно обновлены')
			refetch().then(response => {
				setValue('firstName', response.data?.data.firstName)
				setValue('lastName', response.data?.data.lastName)
			})
		},
		onError() {
			toast.error('Не удалось обновить данне пользовотеля')
		}
	})

	const onSubmit: SubmitHandler<TypeUserFormState> = formData => {
		const query = { ...data.data, ...formData }
		mutate(query)
		setIsEdit(false)
	}

	return (
		<form className={styles['user-form']}>
			<div className={styles['empty-avatar']}>
				<button
					type={`button`}
					onClick={() => toast('Смена аватара пока не доступна')}
				>
					<CircleUserRoundIcon
						color={'#999999'}
						width={160}
						height={160}
					/>
				</button>
			</div>
			<div className={styles.content}>
				<Field
					{...register(`firstName`, {
						required: 'Поле не может быть пустым'
					})}
					className={`${!isEdit && 'opacity-55'}`}
					disabled={!isEdit}
					placeholder={`First Name`}
					error={errors.firstName}
				/>
				<Field
					{...register(`lastName`, {
						required: 'Поле не может быть пустым'
					})}
					className={`${!isEdit && 'opacity-55'}`}
					disabled={!isEdit}
					placeholder={`Last Name`}
					error={errors.lastName}
				/>
				<div className={styles['form-footer']}>
					<Button
						isLoading={isPending}
						type={`button`}
						onClick={isEdit ? handleSubmit(onSubmit) : () => setIsEdit(true)}
					>
						{isEdit ? 'Save' : 'Edit'}
					</Button>
					{isEdit && (
						<button
							className={styles.reset}
							onClick={() => setIsEdit(false)}
						>
							Отмена
						</button>
					)}
				</div>
			</div>
		</form>
	)
}
