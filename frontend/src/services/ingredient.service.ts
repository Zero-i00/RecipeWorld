import type { TypeIngredientFormState } from '@/types/ingredient.types'
import { IIngredient } from '@/types/ingredient.types'

import { axiosWithAuth } from '@/api/interceptors'

class IngredientService {
	private BASE_URL = '/ingredients'

	async getIngredientById(id: number) {
		return await axiosWithAuth.get<IIngredient>(`${this.BASE_URL}/${id}`)
	}

	async createIngredient(data: TypeIngredientFormState) {
		return await axiosWithAuth.post(this.BASE_URL, data)
	}

	async updateIngredient(id: number, data: TypeIngredientFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteIngredient(id: number) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const ingredientService = new IngredientService()
