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
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  // Rest of the component implementation remains the same...
  // (All the useEffect hooks and functions)

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      try {
        // First update messages with user's message
        const newMessages: Message[] = [...messages, { role: "user", content: trimmedMessage }];
        setMessages(newMessages);
        setMessage(""); // Clear input immediately
        setIsProcessing(true);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: trimmedMessage,
            history: newMessages
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I apologize, but I encountered an error processing your request. Please try again." },
        ]);
      } finally {
        setIsProcessing(false);
      }
    }
  }

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendMessage();
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
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
          recorder.start();
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
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
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  }

  // JSX remains the same...
  return (
    <div>
      <audio ref={audioRef} className="hidden" />
      
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
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="relative">
                <label htmlFor="chat-message" className="sr-only">Type your message</label>
                <input
                  id="chat-message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about AI automation..."
                  className="input-field pr-12"
                  aria-label="Type your message"
                  title="Type your message"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                  aria-label="Send message"
                  title="Send message"
                >
                  <Send size={20} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-text-secondary">
                  <button
                    onClick={triggerFileInput}
                    className="flex items-center text-text-secondary hover:text-primary transition-colors"
                    aria-label="Upload file"
                    title="Upload file"
                  >
                    <Upload size={18} className="mr-2" />
                    <span>Upload File</span>
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden"
                    aria-label="File upload input"
                    title="Upload a file"
                  />
                  <span className="ml-2 text-sm">{uploadedFile ? uploadedFile.name : "No files attached"}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <button 
                    className="border border-gray-200 rounded-md px-3 py-1 text-sm flex items-center hover:bg-gray-50 transition-colors"
                    aria-label="Add suggestion"
                    title="Add suggestion"
                  >
                    <span className="mr-1">+</span> Suggestion
                  </button>
                  <button
                    onClick={toggleVoice}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-text-primary hover:bg-gray-200 transition-colors"
                    aria-label="Switch to voice mode"
                    title="Switch to voice mode"
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
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isRecording ? "bg-red-500 text-white" : "bg-white text-primary shadow-md"
              }`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
              title={isRecording ? "Stop recording" : "Start recording"}
            >
              <Mic size={24} />
            </button>
            <button
              onClick={() => {
                setTranscript("")
                setIsRecording(false)
              }}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"
              aria-label="Reset recording"
              title="Reset recording"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={closeInterface}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"
              aria-label="Close voice interface"
              title="Close voice interface"
            >
              <X size={20} />
            </button>
          </div>

          {transcript && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 w-full max-w-xl text-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <p className="text-text-primary whitespace-pre-line">{transcript}</p>
              </div>
            </div>
          )}

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
            <label htmlFor="chat-trigger" className="sr-only">Click to open chat</label>
            <input
              id="chat-trigger"
              type="text"
              placeholder="Ask me anything about AI automation..."
              className="input-field pr-12"
              onClick={toggleChat}
              readOnly
              title="Click to open chat"
              aria-label="Click to open chat"
            />
            <button
              onClick={toggleChat}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
              aria-label="Open chat"
              title="Open chat"
            >
              <Send size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-text-secondary">
              <button
                onClick={triggerFileInput}
                className="flex items-center text-text-secondary hover:text-primary transition-colors"
              >
                <Upload size={18} className="mr-2" />
                <span>Upload File</span>
              </button>
              <label htmlFor="file-upload-trigger" className="sr-only">Upload file</label>
              <input 
                id="file-upload-trigger"
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden"
                aria-label="Upload file"
                title="Upload file"
              />
              <span className="ml-2 text-sm">{uploadedFile ? uploadedFile.name : "No files attached"}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                className="border border-gray-200 rounded-md px-3 py-1 text-sm flex items-center hover:bg-gray-50 transition-colors"
              >
                <span className="mr-1">+</span> Suggestion
              </button>
              <button
                onClick={toggleVoice}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-text-primary hover:bg-gray-200 transition-colors"
                aria-label="Switch to voice mode"
                title="Switch to voice mode"
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
