import { IBase } from '@/types/root.types'


export interface IRecipeNote extends IBase {
	text: string
}

export type TypeRecipeNoteFormState = Partial<Omit<IRecipeNote, 'id'>>
