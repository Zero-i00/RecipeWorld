import { IRecipe } from '@/types/recipe/recipe.types'
import type { TypeUserFormState } from '@/types/user.types'
import { IUser } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
	private BASE_URL = '/user'

	async getUserById(id: number) {
		return await axiosWithAuth.get<IUser>(`${this.BASE_URL}/${id}`)
	}

	async getUserRecipesList(id: number) {
		return await axiosWithAuth.get<IRecipe[]>(
			`${this.BASE_URL}/${id}/recipes_list`
		)
	}

	async updateUser(id: number, data: TypeUserFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteUser(id: number) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const userService = new UserService()
