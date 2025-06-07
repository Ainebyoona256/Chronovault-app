"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your historical knowledge assistant. I can help you explore ancient civilizations, historical events, and answer your questions about human history. What would you like to learn about?",
    timestamp: new Date().toISOString()
  }
]

const SAMPLE_RESPONSES = {
  "pyramid": "The Great Pyramid of Giza was built around 2560 BCE during the Fourth Dynasty of ancient Egypt. It was constructed as a tomb for Pharaoh Khufu and took about 20 years to complete. The pyramid's original height was 146.5 meters (481 feet), making it the tallest human-made structure for over 3,800 years.",
  "democracy": "Democracy first emerged in ancient Athens around 508 BCE under Cleisthenes. This early form of democracy, called 'demokratia' (rule by the people), allowed male citizens to participate in the Assembly and vote on important matters. This system laid the foundation for modern democratic principles.",
  "writing": "The earliest known writing system was developed by the Sumerians in Mesopotamia around 3200 BCE. This system, called cuneiform, used wedge-shaped marks pressed into clay tablets. It was initially used for recording trade transactions but eventually evolved to record literature, laws, and historical events."
}

function HistoricalAIAssistant() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = "I apologize, but I don't have specific information about that topic. Would you like to learn about ancient pyramids, democracy, or early writing systems instead?"
      
      // Check for keywords in the user's message
      const lowercaseInput = input.toLowerCase()
      if (lowercaseInput.includes("pyramid")) {
        response = SAMPLE_RESPONSES.pyramid
      } else if (lowercaseInput.includes("democracy")) {
        response = SAMPLE_RESPONSES.democracy
      } else if (lowercaseInput.includes("writing")) {
        response = SAMPLE_RESPONSES.writing
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-amber-500">Historical Knowledge Assistant</CardTitle>
          <CardDescription className="text-gray-400">
            Ask questions about ancient civilizations and historical events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto space-y-4 p-4 bg-gray-800/50 rounded-lg">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "assistant"
                        ? "bg-gray-800 text-gray-300"
                        : "bg-amber-500/20 text-amber-500"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-50">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-800">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ask a question about history..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="bg-gray-800 border-gray-700"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HistoricalAIAssistant
