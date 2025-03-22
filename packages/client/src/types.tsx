import { ReactNode } from 'react'

export type User = {
  name: string
  isAuthenticated: boolean
}

export type AuthContextType = {
  user: User | null
  login: (data: { login: string; isAuthenticated: boolean }) => Promise<void>
  logout: () => void
}

export type AuthProviderProps = {
  children: ReactNode
}
