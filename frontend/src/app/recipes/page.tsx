import Recipes from '@/app/recipes/Recipes'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Recipes'
}

export default function RecipesPage() {
	return <Recipes />
}
