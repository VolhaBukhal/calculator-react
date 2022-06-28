import { Component, ReactNode, ErrorInfo } from 'react'

import { ErrorWrapper, Heading } from './components'

interface ErrorBoundaryState {
  error: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      error: false,
    }
  }

  static getDerivedStateFromError() {
    return { error: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error: ', error, errorInfo)
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <ErrorWrapper>
            <Heading>Something went wrong &#9785;...</Heading>
          </ErrorWrapper>
        ) : (
          this.props.children
        )}
      </>
    )
  }
}
