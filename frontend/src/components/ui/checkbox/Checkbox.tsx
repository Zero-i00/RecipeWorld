import { Check as CheckIcon } from 'lucide-react'
import React from 'react'

import { COLORS } from '@/constants/color.constants'

import styles from './Checkbox.module.scss'

interface ICheckboxProps {
	isChecked?: boolean
}

export default function Checkbox({ isChecked }: ICheckboxProps) {
	if (isChecked) {
		return (
			<div className={styles.active}>
				<CheckIcon
					width={14}
					height={14}
					color={COLORS.white}
				/>
			</div>
		)
	}

	return <div className={styles.disable} />
}
