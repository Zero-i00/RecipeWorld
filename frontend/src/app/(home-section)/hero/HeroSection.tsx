import React from 'react'

import styles from './HeroSection.module.scss'

const HeroSection = () => {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<h1>
					Find your
					<br />
					Beast
					<br />
					<span>Daily Recipe</span>
				</h1>
			</div>
			<div className={styles.reviews}></div>
		</div>
	)
}

export default HeroSection
