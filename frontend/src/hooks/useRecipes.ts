import { recipeService } from '@/services/recipe/recipe.service'
import { useQuery } from '@tanstack/react-query'

import { IRecipeListQuery } from '@/types/recipe/recipe.types'

export function useRecipes(query: IRecipeListQuery) {
	const { data, isLoading } = useQuery({
		queryKey: ['recipes', query],
		queryFn: () => recipeService.getRecipesList(query)
	})

	return { data, isLoading }
}
