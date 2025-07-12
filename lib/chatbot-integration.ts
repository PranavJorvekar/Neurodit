// Production integration - ONLY uses actual chatbot_infer.py neural network
// No simulated or predefined responses

export async function callChatbotAPI(message: string): Promise<string> {
  try {
    // Call your Python Flask server running the actual neural network
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error(`Neural network server error: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === "error") {
      throw new Error(data.error)
    }

    // Ensure we only return responses from the neural network
    if (data.source !== "neural_network") {
      throw new Error("Response not from neural network")
    }

    return data.response
  } catch (error) {
    console.error("Neural network API error:", error)
    throw new Error("Failed to get response from neural network")
  }
}

// Alternative: Direct subprocess call to chatbot_infer.py
export async function callChatbotScript(message: string): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error("Failed to call neural network")
  }

  const data = await response.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return data.response
}
