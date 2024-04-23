import React from 'react'

import Button from '@/components/ui/buttons/Button'

import styles from './HeroSection.module.scss'

const HeroSection = () => {
	return (
		<section
			id={`hero`}
			className={styles.container}
		>
			<div className={styles.heading}>
				<h1>
					Your daily Dhish
					<br />A <span>Food</span> Journey
				</h1>
				<p className={styles.description}>
					Use the “generate lunch” function and forget about thinking about what
					to eat today, try it now by clicking on the button
				</p>
				<div className={`w-1/2`}>
					<Button>Generate lunch</Button>
				</div>
			</div>
			<div className={styles.reviews}>
				{/*<div className={styles.card}>*/}
				{/*	<img*/}
				{/*		className={styles.image}*/}
				{/*		src='./burger.svg'*/}
				{/*		alt='burger image'*/}
				{/*	/>*/}
				{/*</div>*/}
			</div>
		</section>
	)
}

export default HeroSection
