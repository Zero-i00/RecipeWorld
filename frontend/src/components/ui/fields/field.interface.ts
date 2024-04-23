import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IFieldProps {
	error?: FieldError
	isNumber?: boolean
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps
type TypeTextAreaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export interface IField extends TypeInputPropsField {}

export interface ITextAreaFieldProps extends TypeTextAreaPropsField {}
