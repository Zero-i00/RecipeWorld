import CreateRecipe from '@/app/recipes/create/CreateRecipe'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create Recipe'
}

export default function CreateRecipePage() {
	return <CreateRecipe />
}
