"use client"

import React, { Suspense, lazy, useState, useEffect } from "react"

// Dynamically import the Hero3DLogo component
const Hero3DLogo = lazy(() => import("./hero-3d-logo"))

export default function DynamicHero3DLogo() {
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
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
        <div className="w-32 h-32 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
          <div className="text-primary text-4xl font-bold font-display">FB</div>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      }
    >
      <ErrorBoundary onError={() => setHasError(true)}>
        <Hero3DLogo />
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

