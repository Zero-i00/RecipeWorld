import { Loader as LoaderIcon } from 'lucide-react'
import React from 'react'

export default function Loader() {
	return (
		<div className={`flex justify-center items-center`}>
			<LoaderIcon className={`animate-spin w-5 h-5 text-white`} />
		</div>
	)
}
