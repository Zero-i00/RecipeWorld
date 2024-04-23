import Recipe from '@/app/recipes/[id]/Recipe'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Recipe'
}

export default function RecipePage({ params }: { params: { id: string } }) {
	return <Recipe id={params.id} />
}
