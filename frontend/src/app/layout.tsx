import { Providers } from '@/app/providers'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Find your best recipe'
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru'>
			<body>
				<Providers>
					{children}
					<Toaster
						theme={`light`}
						position={`bottom-right`}
						duration={3000}
					/>
				</Providers>
			</body>
		</html>
	)
}
