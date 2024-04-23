import { forwardRef } from 'react'

import { ITextAreaFieldProps } from '@/components/ui/fields/field.interface'

import styles from './Field.module.scss'

const TextAreaField = forwardRef<HTMLTextAreaElement, ITextAreaFieldProps>(
	({ error, isNumber = false, style, ...rest }, ref) => {
		return (
			<div
				className={styles.input}
				style={style}
			>
				<textarea
					ref={ref}
					onKeyDown={event => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault()
						}
					}}
					{...rest}
				/>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

TextAreaField.displayName = 'TextAreaField'

export default TextAreaField
