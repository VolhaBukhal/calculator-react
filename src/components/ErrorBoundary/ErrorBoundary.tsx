import { Component, ReactNode } from 'react'
import { ErrorWrapper, Heading } from './components'

type ErrorBoundaryState = {
  error: boolean
}

type ErrorBoundaryProps = {
  children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      error: false,
    }
  }

  static getDerivedStateFromError() {
    return { error: true }
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

export default ErrorBoundary
