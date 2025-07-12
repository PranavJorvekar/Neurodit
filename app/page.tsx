import ChatInterface from "@/components/chat-interface"
import Header from "@/components/header"
import ModelInfo from "@/components/model-info"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ModelInfo />
          <ChatInterface />
        </div>
      </div>
    </main>
  )
}
