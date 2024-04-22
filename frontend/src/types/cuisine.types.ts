import { IBase } from '@/types/root.types'


export interface  ICuisine extends IBase {
	name: string
}

export type TypeCuisineResponse = ICuisine[]
