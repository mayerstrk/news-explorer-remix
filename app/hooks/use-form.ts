import { useState, type ChangeEvent } from 'react'
import { z } from 'zod'

export const signinValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export const signupValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username cannot be longer than 20 characters' }),
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
