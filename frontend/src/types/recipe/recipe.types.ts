import { IBase } from '@/types/root.types'
import { IIngredient } from '@/types/ingredient.types'
import { IComment } from '@/types/comment.types'
import { IRecipeStep } from '@/types/recipe/recipe-step.types'
import { IRecipeNote } from '@/types/recipe/recipe-note.types'

export enum  EnumRecipeType {
	first   ,
	second,
	salad  ,
	dessert ,
	starter  ,
	drink
}

export interface IRecipe extends IBase {
	image: string,
	title: string,
	description: string,
	prepTime: number,
	cookTime: number,
	serving: number,
	proteins: number,
	fats: number,
	carbs: number,
	type: EnumRecipeType,
	createdAt: Date,
	userId: number,
	cuisineId: number | null,
	comments: IComment[] | null,
	instructionSteps: IRecipeStep[] | null,
	recipeNotes: IRecipeNote[] | null,
	ingredients: IIngredient[] | null
}

export interface IRecipeListQuery {
	byRating: boolean
}

export type TypeRecipeFormState = Partial<Omit<IRecipe, 'id' | 'createdAt' | 'instructionSteps' | 'recipeNotes' | 'ingredients' | "comments">>
