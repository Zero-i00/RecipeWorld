import Profile from '@/app/profile/Profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Profile'
}

export default function ProfilePage() {
	return <Profile />
}
