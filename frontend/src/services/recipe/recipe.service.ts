import { IComment } from '@/types/comment.types'
import { IIngredient } from '@/types/ingredient.types'
import { IRecipeNote } from '@/types/recipe/recipe-note.types'
import { IRecipeStep } from '@/types/recipe/recipe-step.types'
import type { TypeRecipeFormState } from '@/types/recipe/recipe.types'
import { IRecipe, IRecipeListQuery } from '@/types/recipe/recipe.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

class RecipeService {
	private BASE_URL = '/recipes'

	async getRecipeById(id: number) {
		return await axiosWithAuth.get<IRecipe>(`${this.BASE_URL}/${id}`)
	}

	async getRecipesList(query: IRecipeListQuery) {
		return await axiosWithAuth.get<IRecipe[]>(this.BASE_URL)
	}

	async getRecipeCommentsList(id: number) {
		return await axiosWithAuth.get<IComment[]>(
			`${this.BASE_URL}/${id}/comments`
		)
	}

	async search(query: string) {
		return await axiosClassic.get<IRecipe[]>(
			`${this.BASE_URL}/search?=${query}`
		)
	}

	async getRecipeIngredientsList(id: number) {
		return await axiosWithAuth.get<IIngredient[]>(
			`${this.BASE_URL}/${id}/ingredients`
		)
	}

	async getRecipeNotesList(id: number) {
		return await axiosWithAuth.get<IRecipeNote[]>(
			`${this.BASE_URL}/${id}/recipe_notes`
		)
	}

	async getRecipeStepsList(id: number) {
		return await axiosWithAuth.get<IRecipeStep[]>(
			`${this.BASE_URL}/${id}/instruction_steps`
		)
	}

	async createRecipe(data: TypeRecipeFormState) {
		return await axiosWithAuth.post<IRecipe>(this.BASE_URL, data)
	}

	async updateRecipe(id: number, data: TypeRecipeFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteRecipe(id: number) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const recipeService = new RecipeService()
