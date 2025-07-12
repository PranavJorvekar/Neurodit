"use client"

import { motion } from "framer-motion"
import { Brain, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-red-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Catbot</h1>
              <p className="text-sm text-zinc-400">Neural Network Chatbot</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm text-zinc-400">Trained on</p>
              <p className="text-sm font-semibold text-red-400">10M Reddit Conversations</p>
            </div>
            <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 bg-transparent">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
