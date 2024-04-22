import { IBase } from '@/types/root.types'

export interface IRecipeStep extends IBase {
	step: number
	text: string
}

export type TypeRecipeStepFormState = Partial<Omit<IRecipeStep, 'id'>>
