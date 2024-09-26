import { Component, ErrorInfo, ReactNode } from 'react'
import styled from 'styled-components'
import Column from './Column'
import FButton from './FButton'

interface Props {
  fallbackComponent?: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent ?? <DefaultErrorFallback />
    }

    return this.props.children
  }
}

export default ErrorBoundary

export const DefaultErrorFallback = () => (
  <BlurBox>
    <Card>
      <h1>Something went wrong</h1>
      <span>Try refreshing the page</span>
      <div />
      <FButton
        style={{
          color: 'var(--brand-neutral-dark)',
          backgroundColor: 'var(--brand-color-secondary)',
        }}
        onClick={() => window.location.reload()}
      >
        Retry
      </FButton>
    </Card>
  </BlurBox>
)

const Card = styled(Column)`
  width: 100%;
  gap: 12px;
  padding: 16px;
  background-color: rgba(var(--brand-neutral-dark-rgb), 1);
`

const BlurBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(var(--brand-neutral-dark-rgb), 0.5);
`
