import Home from '@/app/Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Home'
}

export default function HomePage() {
	return <Home />
}
