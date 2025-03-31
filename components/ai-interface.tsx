"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Mic, X, RefreshCw, Send, Upload } from "lucide-react"
import { useAIInterface } from "./ai-interface-provider"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AIInterface() {
  const { isChatActive, isVoiceActive, setIsChatActive, setIsVoiceActive } = useAIInterface()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you with AI automation today?" },
  ])
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle voice visualization
  useEffect(() => {
    if (isVoiceActive && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      // Animation function for the orb
      const drawOrb = () => {
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Center coordinates
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Draw glowing orb
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80)

        gradient.addColorStop(0, "rgba(255, 179, 153, 1)")
        gradient.addColorStop(0.5, "rgba(255, 120, 70, 0.8)")
        gradient.addColorStop(1, "rgba(224, 90, 43, 0.2)")

        ctx.beginPath()
        ctx.arc(centerX, centerY, 80, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw ripple effects
        const time = Date.now() / 1000
        for (let i = 0; i < 3; i++) {
          const size = 80 + 30 * (i + 1) + 10 * Math.sin(time * (i + 1) * 0.5)
          const alpha = Math.max(0, 0.5 - i * 0.15 - 0.1 * Math.sin(time * (i + 1) * 0.5))

          ctx.beginPath()
          ctx.arc(centerX, centerY, size, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 120, 70, ${alpha})`
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Add subtle movement to the orb
        if (isRecording) {
          // Add voice-reactive elements when recording
          const pulseSize = 80 + 10 * Math.sin(Date.now() / 100)

          ctx.beginPath()
          ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 179, 153, 0.3)"
          ctx.fill()
        }

        animationRef.current = requestAnimationFrame(drawOrb)
      }

      animationRef.current = requestAnimationFrame(drawOrb)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [isVoiceActive, isRecording])

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      setMessages([...messages, { role: "user", content: message }])

      // Simulate processing
      setIsProcessing(true)

      // Simulate AI response after a delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I understand you're interested in "${message}". Our AI automation solutions can help with this by streamlining your workflows and reducing manual tasks.`,
          },
        ])
        setIsProcessing(false)
      }, 1500)

      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadedFile(file)
  }

  const toggleChat = () => {
    if (isVoiceActive) {
      setIsVoiceActive(false)
      setTimeout(() => setIsChatActive(true), 300)
    } else {
      setIsChatActive(!isChatActive)
    }
  }

  const toggleVoice = () => {
    if (isChatActive) {
      setIsChatActive(false)
      setTimeout(() => setIsVoiceActive(true), 300)
    } else {
      setIsVoiceActive(!isVoiceActive)
    }

    if (!isVoiceActive && !isRecording) {
      // Start recording simulation
      setIsRecording(true)
      setTranscript("")

      // Simulate transcript generation
      const phrases = [
        "How can AI automation help my business?",
        "What are the benefits of process automation?",
        "Can you explain machine learning applications for my industry?",
        "Tell me about your consulting services.",
      ]

      const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)]
      let currentIndex = 0

      const typingInterval = setInterval(() => {
        if (currentIndex <= selectedPhrase.length) {
          setTranscript(selectedPhrase.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)

          // Simulate AI processing after transcript is complete
          setTimeout(() => {
            setIsRecording(false)
            setIsProcessing(true)

            // Simulate AI response
            setTimeout(() => {
              setIsProcessing(false)
              setTranscript(
                selectedPhrase +
                  "\n\nOur AI automation solutions can help your business by reducing manual tasks, improving efficiency, and providing valuable insights from your data. Would you like to learn more about a specific aspect?",
              )
            }, 1500)
          }, 500)
        }
      }, 100)
    }
  }

  const closeInterface = () => {
    setIsChatActive(false)
    setIsVoiceActive(false)
    setIsRecording(false)
    setTranscript("")
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  return (
    <div>
      {/* Chat Interface */}
      {isChatActive && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col animate-slide-down">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">AI Assistant</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleVoice}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Switch to voice mode"
                >
                  <Mic size={18} />
                </button>
                <button
                  onClick={closeInterface}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-text-primary"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about AI automation..."
                  className="input-field pr-12"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                >
                  <Send size={20} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* File upload */}
                <div className="flex items-center text-text-secondary">
                  <button
                    onClick={triggerFileInput}
                    className="flex items-center text-text-secondary hover:text-primary transition-colors"
                  >
                    <Upload size={18} className="mr-2" />
                    <span>Upload File</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <span className="ml-2 text-sm">{uploadedFile ? uploadedFile.name : "No files attached"}</span>
                </div>

                {/* Suggestion and voice */}
                <div className="flex items-center space-x-4">
                  <button className="border border-gray-200 rounded-md px-3 py-1 text-sm flex items-center hover:bg-gray-50 transition-colors">
                    <span className="mr-1">+</span> Suggestion
                  </button>
                  <button
                    onClick={toggleVoice}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-text-primary hover:bg-gray-200 transition-colors"
                  >
                    <Mic size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Interface */}
      {isVoiceActive && (
        <div className="fixed inset-0 bg-black z-40 animate-fade-in">
          {/* Canvas for orb visualization */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Voice Controls */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={() => {
                setIsRecording(!isRecording)
                setTranscript("")
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isRecording ? "bg-red-500 text-white" : "bg-white text-primary shadow-md"
              }`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              <Mic size={24} />
            </button>
            <button
              onClick={() => {
                setTranscript("")
                setIsRecording(false)
              }}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"
              aria-label="Refresh"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={closeInterface}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"
              aria-label="Close voice interface"
            >
              <X size={20} />
            </button>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 w-full max-w-xl text-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <p className="text-text-primary whitespace-pre-line">{transcript}</p>
              </div>
            </div>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat/Voice Interface Trigger */}
      {!isChatActive && !isVoiceActive && (
        <div className="bg-white rounded-lg shadow-custom p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask me anything about AI automation..."
              className="input-field pr-12"
              onClick={toggleChat}
              readOnly
            />
            <button
              onClick={toggleChat}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
            >
              <Send size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            {/* File upload */}
            <div className="flex items-center text-text-secondary">
              <button
                onClick={triggerFileInput}
                className="flex items-center text-text-secondary hover:text-primary transition-colors"
              >
                <Upload size={18} className="mr-2" />
                <span>Upload File</span>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <span className="ml-2 text-sm">{uploadedFile ? uploadedFile.name : "No files attached"}</span>
            </div>

            {/* Suggestion and voice */}
            <div className="flex items-center space-x-4">
              <button className="border border-gray-200 rounded-md px-3 py-1 text-sm flex items-center hover:bg-gray-50 transition-colors">
                <span className="mr-1">+</span> Suggestion
              </button>
              <button
                onClick={toggleVoice}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-text-primary hover:bg-gray-200 transition-colors"
              >
                <Mic size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

