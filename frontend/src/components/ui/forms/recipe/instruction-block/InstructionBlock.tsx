import cn from 'clsx'
import React from 'react'
import { toast } from 'sonner'

import { IDivElement } from '@/components/elements/element.types'
import { instructionsData } from '@/components/ui/forms/recipe/instruction-block/instructions.data'

import styles from './InstructionBlock.module.scss'

export default function InstructionBlock({
	className,
	...rest
}: IDivElement<unknown>) {
	return (
		<div
			{...rest}
			className={cn(styles.container, className)}
		>
			<h1 className={styles.heading}>Instruction</h1>
			{instructionsData.map((instruction, index) => (
				<button
					type={`button`}
					className={styles['instruction-item']}
					onClick={() =>
						toast.info(
							'It is not yet possible to customize recipe instructions'
						)
					}
					key={`instruction-item-${instruction.step}-${index}`}
				>
					<h1 className={styles.step}>Step: {instruction.step}</h1>
					<p className={styles.text}>{instruction.text}</p>
				</button>
			))}
		</div>
	)
}
