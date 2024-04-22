import type { TypeRecipeStepFormState } from '@/types/recipe/recipe-step.types'
import { IRecipeStep } from '@/types/recipe/recipe-step.types'

import { axiosWithAuth } from '@/api/interceptors'

class RecipeStepService {
	private BASE_URL = '/recipe/steps'

	async getStepById(id: number) {
		return await axiosWithAuth.get<IRecipeStep>(`${this.BASE_URL}/${id}`)
	}

	async createStep(data: TypeRecipeStepFormState) {
		return await axiosWithAuth.post(this.BASE_URL, data)
	}

	async updateStep(id: number, data: TypeRecipeStepFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteStep(id: number) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const recipeStepService = new RecipeStepService()
