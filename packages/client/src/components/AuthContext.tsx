import React, { createContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { User, AuthContextType, AuthProviderProps } from '../types'
import { useLogoutUserMutation } from '../store/features/user/userApiSlice'

// Создаем контекст
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Создаем провайдер
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()
  const [logoutUser] = useLogoutUserMutation()

  const login = async (data: User) => {
    setUser(data)
    navigate('/play')
  }

  const logout = () => {
    setUser(null)
    navigate('/', { replace: true })
    logoutUser({})
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
