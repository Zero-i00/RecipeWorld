class DASHBOARD {
	private root = '/'

	HOME = this.root
	PROFILE = `${this.root}profile`
	RECIPES = `${this.root}recipes`
	CREATE_RECIPE = `${this.RECIPES}/create/`
	UPDATE_RECIPE = `${this.RECIPES}/update/`
}

export const DASHBOARD_PAGES = new DASHBOARD()
