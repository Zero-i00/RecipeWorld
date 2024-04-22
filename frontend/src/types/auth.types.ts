export interface ILoginFrom {
	username: string
	password: string
}

export interface IRegisterForm {
	username: string
	password: string
	firstName: string
	lastName: string
}

export interface IAuthResponse {
	accessToken: string
}
