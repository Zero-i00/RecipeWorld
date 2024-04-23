import { HTMLAttributes } from 'react'

export interface IDivElement<T> extends HTMLAttributes<HTMLDivElement> {
	item: T
}
