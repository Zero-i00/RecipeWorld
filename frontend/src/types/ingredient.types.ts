import { IBase } from '@/types/root.types'


export enum EnumIngredientUnit {
	milligrams,
	grams,
	kilograms,
	milliliters,
	liters,
	pieces,
}


export  interface IIngredient extends IBase {
	title: string
	amount: number
	unit: EnumIngredientUnit
}

export type TypeIngredientFormState = Partial<Omit<IIngredient, 'id'>>
