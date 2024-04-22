import { IBase } from '@/types/root.types'

export interface IUser extends IBase {
	username: string
	avatar: string
	firstName: string
	lastName: string
}

export type TypeUserFormState = Partial<Omit<IUser, 'id'>>
