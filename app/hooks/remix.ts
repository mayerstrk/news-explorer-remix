import { useNavigate } from '@remix-run/react'
import { To } from 'react-router'
import { Route } from '~/utils/enums'

export const useAppNavigate = () => {
  const navigate = useNavigate()
  return (path: To | Route) => {
    navigate(path)
  }
}
