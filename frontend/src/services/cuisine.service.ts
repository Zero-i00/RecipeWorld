import { TypeCuisineResponse } from '@/types/cuisine.types'

import { axiosWithAuth } from '@/api/interceptors'

class CuisineService {
	private BASE_URL = '/cuisines'

	async getCuisinesList() {
		return await axiosWithAuth.get<TypeCuisineResponse>(this.BASE_URL)
	}
}

export const cuisineService = new CuisineService()
