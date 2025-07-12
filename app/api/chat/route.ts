import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Call the Flask backend API
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    })

    if (!response.ok) {
      throw new Error(`Flask API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({ response: data.response })

  } catch (error) {
    console.error('Error calling Catbot API:', error)
    
    // Fallback responses if the Flask server is not available
    const fallbackResponses = [
      "I'm having trouble connecting to my neural network right now. Please make sure the Flask server is running on port 5000.",
      "The AI model is currently offline. Please check if the Python backend is running.",
      "Connection error: Unable to reach the Catbot neural network. Try restarting the Flask server.",
      "Technical difficulties detected. The model server needs to be restarted.",
    ]
    
    const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    
    return NextResponse.json(
      { response: randomFallback },
      { status: 503 }
    )
  }
}

export async function GET() {
  try {
    // Check if the Flask backend is running
    const response = await fetch('http://localhost:5000/status', {
      method: 'GET',
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ 
        status: 'connected', 
        message: 'Catbot neural network is ready' 
      })
    } else {
      return NextResponse.json({ 
        status: 'disconnected', 
        message: 'Catbot neural network is not available' 
      })
    }
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Cannot connect to Catbot neural network' 
    })
  }
}
