'use client'

import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: '24px',
              backgroundColor: 'rgba(220, 100, 100, 0.1)',
              border: '1px solid rgb(220, 100, 100)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: '0 0 12px', fontWeight: 'bold' }}>Algo salió mal</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgb(14, 27, 27)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Reintentar
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
