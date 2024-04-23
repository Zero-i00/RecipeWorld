class DASHBOARD {
    private root = '/'

    HOME = this.root
    PROFILE = `${this.root}/profile`
    RECIPES = `${this.root}/recipes`
    RECIPE = `${this.root}/recipe/`
    CREATE_RECIPE = `${this.root}/recipe/create/`
    UPDATE_RECIPE = `${this.root}/recipe/update/`
}

export const DASHBOARD_PAGES = new DASHBOARD()
