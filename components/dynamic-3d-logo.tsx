"use client"

import React, { Suspense, lazy, useState, useEffect } from "react"
import Loading3D from "./3d-loading"
import LogoFallback from "./logo-fallback"

// Dynamically import the 3D logo component
const Logo3D = lazy(() => import("./3d-logo"))

export default function Dynamic3DLogo({ className = "" }: { className?: string }) {
  const [isClient, setIsClient] = useState(false)
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if WebGL is available
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

      if (!gl) {
        setIsWebGLAvailable(false)
      }
    } catch (e) {
      setIsWebGLAvailable(false)
    }
  }, [])

  if (!isClient || !isWebGLAvailable || hasError) {
    return <LogoFallback className={className} />
  }

  return (
    <Suspense fallback={<Loading3D />}>
      <ErrorBoundary onError={() => setHasError(true)}>
        <Logo3D className={className} />
      </ErrorBoundary>
    </Suspense>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode; onError: () => void }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

