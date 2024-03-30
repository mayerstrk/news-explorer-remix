import { useState, type ChangeEvent } from 'react'
import * as yup from 'yup'

export const signinValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
})

export const signupValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot be longer than 20 characters'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
})

type InputName = 'email' | 'password' | 'username'

type InputValues = { [key in InputName]: string }

const useForm = () => {
  const [values, setValues] = useState<InputValues>({} as InputValues)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target) {
      const { value, name } = event.target
      setValues({ ...values, [name]: value })
    } else {
      throw new Error('Sorry')
    }
  }

  return { values, handleChange, setValues }
}

export { type InputName, type InputValues, useForm }
