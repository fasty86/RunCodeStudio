import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AuthProviderProps } from '../types'

type ChildrenProps = AuthProviderProps

export const ProtectedRoute = ({ children }: ChildrenProps) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}
