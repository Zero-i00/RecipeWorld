import SearchProducts from '@/app/search/[query]/SearchProducts'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}

export default function SearchPage({ params }: { params: { query: string } }) {
	return <SearchProducts query={params.query} />
}
