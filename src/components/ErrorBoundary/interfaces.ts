import { ReactNode } from 'react'

export interface ErrorBoundaryState {
  error: boolean
}

export interface ErrorBoundaryProps {
  children: ReactNode
}
