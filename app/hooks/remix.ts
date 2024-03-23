import { useNavigate } from '@remix-run/react'
import { To } from 'react-router'
import { Route } from '~/utils/string-unions'

export const useAppNavigate = () => {
  const navigate = useNavigate()
  return (path: To | Route) => {
    navigate(path)
  }
}
