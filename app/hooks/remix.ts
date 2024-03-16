import { useNavigate } from '@remix-run/react'
import { Path } from '~/utils/string-unions'
import { To } from 'react-router'

export const useAppNavigate = () => {
  const navigate = useNavigate()
  return (path: To | Path) => {
    navigate(path)
  }
}
