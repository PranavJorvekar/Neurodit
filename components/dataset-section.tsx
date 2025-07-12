"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Filter, FileText, Code, BarChart } from "lucide-react"

export default function DatasetSection() {
  const datasetInfo = [
    {
      icon: <Database className="h-6 w-6 text-red-500" />,
      title: "Source",
      description: "Reddit comment dumps from 2008 & 2015",
    },
    {
      icon: <BarChart className="h-6 w-6 text-red-500" />,
      title: "Size",
      description: "10M training pairs, 250K validation pairs",
    },
    {
      icon: <Filter className="h-6 w-6 text-red-500" />,
      title: "Filters",
      description: "Only comments with score ≥ 2",
    },
    {
      icon: <FileText className="h-6 w-6 text-red-500" />,
      title: "Preprocessing",
      description: "Lowercase, tokenization, length filtering (2–15 words)",
    },
    {
      icon: <Code className="h-6 w-6 text-red-500" />,
      title: "Structure",
      description: "Uses .from/.to file format for efficient training",
    },
    {
      icon: <BarChart className="h-6 w-6 text-red-500" />,
      title: "Vocabulary",
      description: "15,000 essential words, Zipf's law-compliant distribution",
    },
  ]

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">📊 Dataset Deep Dive</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Exploring the massive dataset that powers Catbot's intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {datasetInfo.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-zinc-800 border-zinc-700 h-full">
              <CardContent className="pt-6 flex items-start">
                <div className="mr-4 mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-center">Sample Conversation Pair</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="bg-zinc-700 p-4 rounded-lg self-start max-w-[80%]">
                <p>What's the best way to learn Python?</p>
              </div>
              <div className="bg-red-900 p-4 rounded-lg self-end max-w-[80%]">
                <p>Start with small projects and practice daily.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
