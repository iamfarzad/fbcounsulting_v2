"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type AIInterfaceContextType = {
  isChatActive: boolean
  isVoiceActive: boolean
  setIsChatActive: (active: boolean) => void
  setIsVoiceActive: (active: boolean) => void
}

const AIInterfaceContext = createContext<AIInterfaceContextType | undefined>(undefined)

export function AIInterfaceProvider({ children }: { children: React.ReactNode }) {
  const [isChatActive, setIsChatActive] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  return (
    <AIInterfaceContext.Provider
      value={{
        isChatActive,
        isVoiceActive,
        setIsChatActive,
        setIsVoiceActive,
      }}
    >
      {children}
    </AIInterfaceContext.Provider>
  )
}

export function useAIInterface() {
  const context = useContext(AIInterfaceContext)
  if (context === undefined) {
    throw new Error("useAIInterface must be used within an AIInterfaceProvider")
  }
  return context
}

