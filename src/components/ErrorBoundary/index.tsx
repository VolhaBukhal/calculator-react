import { Component, ErrorInfo } from 'react'

import { ErrorBoundaryProps, ErrorBoundaryState } from './interfaces'
import { ErrorWrapper, Heading } from './styles'

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
