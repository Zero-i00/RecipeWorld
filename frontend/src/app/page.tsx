import Home from '@/app/Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Auth'
}

export default function HomePage() {
	return <Home />
}
