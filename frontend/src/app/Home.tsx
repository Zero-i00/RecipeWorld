import AboutSection from '@/app/(home-section)/about/AboutSection'
import HeroSection from '@/app/(home-section)/hero/HeroSection'
import SelectionSection from '@/app/(home-section)/selection/SelectionSection'
import React from 'react'

import Layout from '@/components/layout/Layout'
import Search from '@/components/ui/search/Search'

export default function Home() {
	return (
		<Layout className={`relative`}>
			<div className={`-z-10 opacity-55 absolute top-0 right-0`}>
				<img
					src='./vectors/hero-spot.svg'
					alt='spot'
				/>
			</div>
			<Search item={undefined} />
			<HeroSection />
			<AboutSection />
			<SelectionSection />
		</Layout>
	)
}
