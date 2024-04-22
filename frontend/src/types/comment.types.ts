import { IBase } from '@/types/root.types'


export interface IComment extends IBase {
	title: string
	text: string
	created_at: Date
}

export type TypeCommentFormState = Partial<Omit<IComment, 'id' | 'created_at'>>
