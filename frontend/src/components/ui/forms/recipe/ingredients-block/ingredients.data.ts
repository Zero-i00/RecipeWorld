import {
	EnumIngredientUnit,
	TypeIngredientFormState
} from '@/types/ingredient.types'

export const ingredientsData: TypeIngredientFormState[] = [
	{
		amount: 15,
		unit: EnumIngredientUnit.grams,
		title: 'Beans'
	},
	{
		amount: 1,
		unit: EnumIngredientUnit.pieces,
		title: 'Corn'
	}
]
