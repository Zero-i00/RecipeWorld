import type { TypeRecipeNoteFormState } from '@/types/recipe/recipe-note.types'
import { IRecipeNote } from '@/types/recipe/recipe-note.types'

import { axiosWithAuth } from '@/api/interceptors'

class RecipeNoteService {
	private BASE_URL = '/recipe/notes'

	async getNoteById(id: number) {
		return await axiosWithAuth.get<IRecipeNote>(`${this.BASE_URL}/${id}`)
	}

	async createNote(data: TypeRecipeNoteFormState) {
		return await axiosWithAuth.post(this.BASE_URL, data)
	}

	async updateNote(id: number, data: TypeRecipeNoteFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteNote(id: number) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const recipeNoteService = new RecipeNoteService()
