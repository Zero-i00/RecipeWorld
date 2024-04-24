import { IBase } from '@/types/root.types'

export interface IRecipeStep extends IBase {
	step: number
	text: string
	recipeId: number
}

export type TypeRecipeStepFormState = Partial<Omit<IRecipeStep, 'id'>>
