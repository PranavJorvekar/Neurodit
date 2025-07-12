"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "🤖 Catbot Neural Network loaded. Ready to generate responses from 10M Reddit conversations. Type a message to start chatting!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check connection status on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/chat')
        const data = await response.json()
        setConnectionStatus(data.status === 'connected' ? 'connected' : 'disconnected')
      } catch (error) {
        setConnectionStatus('disconnected')
      }
    }
    
    checkConnection()
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call the API route that interfaces with chatbot_infer.py
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.response || "I'm having trouble generating a response right now.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Sorry, I'm having technical difficulties. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="bg-zinc-800/50 border-zinc-700 h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-3 ${
              connectionStatus === 'connected' 
                ? 'bg-green-500 animate-pulse' 
                : connectionStatus === 'checking' 
                ? 'bg-yellow-500 animate-pulse' 
                : 'bg-red-500'
            }`}></div>
            <span>Chat with Catbot</span>
          </div>
          <div className="text-sm text-zinc-400 font-normal">
            {connectionStatus === 'connected' 
              ? 'Neural Network Active' 
              : connectionStatus === 'checking' 
              ? 'Checking Connection...' 
              : 'Neural Network Offline'}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/30 mx-4 rounded-lg">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start space-x-3 ${
                message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-red-600" : "bg-zinc-700"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-zinc-300" />
                )}
              </div>

              <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                <div
                  className={`rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "bg-red-900/50 text-white border border-red-800/50"
                      : "bg-zinc-800/50 text-zinc-100 border border-zinc-700/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-zinc-500 mt-1 px-1">{formatTime(message.timestamp)}</p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                <Bot className="h-4 w-4 text-zinc-300" />
              </div>
              <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                  <span className="text-sm text-zinc-400">Catbot is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to the neural network..."
            className="bg-zinc-700/50 border-zinc-600 text-zinc-100 placeholder:text-zinc-400 focus:border-red-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
