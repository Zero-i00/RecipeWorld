import { COLORS } from './src/constants/color.constants'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: COLORS,
			spacing: {
				0.5: '0.12rem',
				layout: '1.4rem',
				'big-layout': '2.3rem'
			},
			fontFamily: {
				poppins: ['Montserrat', 'sans-serif'],
				dm: ['DM Sans', 'sans-serif']
			},
			fontSize: {
				xs: '0.9rem',
				sm: '1.2rem',
				base: '1.6rem',
				lg: '2.25rem',
				xl: '2.9rem',
				'2xl': '2.9rem'
			},
			screens: {
				sm: '576px',
				'sm-max': { max: '576px' },
				md: '768px',
				'md-max': { max: '768px' },
				lg: '992px',
				'lg-max': { max: '992px' },
				xl: '1200px',
				'xl-max': { max: '1200px' },
				'2xl': '1320px',
				'2xl-max': { max: '1320px' },
				'3xl': '1600px',
				'3xl-max': { max: '1600px' },
				'4xl': '1850px',
				'4xl-max': { max: '1850px' }
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: []
}
export default config
