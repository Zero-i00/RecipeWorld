import { IBase } from '@/types/root.types'

export interface IComment extends IBase {
	title: string
	text: string
	created_at: Date
	userId: number
	userName?: string
}

export interface ICommentForm
	extends Omit<IComment, 'id' | 'created_at' | 'userName'> {
	userId: number
	recipeId: number
}

export type TypeCommentFormState = Partial<ICommentForm>
