"use client"

import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const chatRef = useRef<HTMLDivElement>(null)

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Abstract digital pattern background */}
      <div className="absolute inset-0 z-0">
        <MatrixBackground />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Catbot: The Reddit-Trained Neural Chatbot
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-12 text-zinc-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          10 million Reddit conversations. One intelligent AI.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button onClick={scrollToChat} size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
            Start Chatting
          </Button>
        </motion.div>
      </div>

      <div ref={chatRef} className="absolute bottom-0 h-1 w-full"></div>
    </div>
  )
}

function MatrixBackground() {
  return (
    <div className="matrix-background w-full h-full bg-zinc-900 opacity-70">
      <style jsx>{`
        .matrix-background {
          background-image: 
            radial-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            radial-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: 0 0, 25px 25px;
          animation: matrix-animation 20s linear infinite;
          position: relative;
        }
        
        .matrix-background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
        }
        
        @keyframes matrix-animation {
          0% {
            background-position: 0 0, 25px 25px;
          }
          100% {
            background-position: 1000px 1000px, 1025px 1025px;
          }
        }
      `}</style>
    </div>
  )
}
