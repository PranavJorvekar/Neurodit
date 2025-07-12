"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Zap, Target } from "lucide-react"

export default function ModelInfo() {
  const stats = [
    {
      icon: <Database className="h-5 w-5 text-red-500" />,
      label: "Training Data",
      value: "10M Pairs",
      description: "Reddit conversations",
    },
    {
      icon: <Target className="h-5 w-5 text-green-500" />,
      label: "Accuracy",
      value: "67.3%",
      description: "Validation accuracy",
    },
    {
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      label: "Response Time",
      value: "~0.3s",
      description: "Average inference",
    },
    {
      icon: <Activity className="h-5 w-5 text-purple-500" />,
      label: "Architecture",
      value: "BiLSTM",
      description: "Neural network",
    },
  ]

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Advanced Neural Network Chatbot</h2>
            <p className="text-zinc-400 mb-4">
              Powered by bidirectional LSTM architecture trained on millions of Reddit conversations
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-red-900/50 text-red-300 border-red-800">
                TensorFlow
              </Badge>
              <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-800">
                Keras
              </Badge>
              <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-800">
                Python
              </Badge>
              <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 border-purple-800">
                LSTM
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg bg-zinc-900/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
                <div className="text-xs text-zinc-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
