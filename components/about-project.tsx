"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Database, MemoryStickIcon as Memory } from "lucide-react"

export default function AboutProject() {
  const features = [
    {
      icon: <Database className="h-10 w-10 text-red-500" />,
      title: "Massive Dataset",
      description: "Trained on 10 million Reddit conversation pairs for diverse responses.",
    },
    {
      icon: <Brain className="h-10 w-10 text-red-500" />,
      title: "Advanced Neural Network",
      description: "Uses bidirectional LSTM, embedding layers, dropout, and top-k sampling.",
    },
    {
      icon: <Memory className="h-10 w-10 text-red-500" />,
      title: "Context Awareness",
      description: "Produces neural-generated responses with grammar and context understanding.",
    },
  ]

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About the Project</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          An advanced neural network chatbot trained on millions of real conversations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-zinc-800 border-zinc-700 h-full">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
