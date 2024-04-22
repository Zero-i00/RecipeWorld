import {
	removeFromStorage,
	saveTokenStorage
} from '@/services/auth-token.service'

import { IAuthResponse, ILoginFrom, IRegisterForm } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

export const authService = {
	async register(data: IRegisterForm) {
		return await axiosClassic.post(`/auth/register/`, data)
	},

	async login(data: ILoginFrom) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/login/`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	},

	async logout() {
		return removeFromStorage()
	}
}
