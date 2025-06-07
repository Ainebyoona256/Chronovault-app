"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Palette, Download } from "lucide-react"

interface GeneratedImage {
  id: string
  prompt: string
  url: string
  civilization: string
  category: string
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])

  const suggestedPrompts = [
    "Ancient Egyptian temple with hieroglyphics and golden decorations",
    "Mesopotamian ziggurat at sunset with people in traditional clothing",
    "Greek agora with philosophers discussing under marble columns",
    "Mayan pyramid surrounded by jungle with astronomical symbols",
    "Roman forum bustling with citizens in togas",
    "Ancient Chinese palace with traditional architecture and gardens",
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate image generation
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: prompt,
        url: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(prompt.slice(0, 20))}`,
        civilization: "Ancient",
        category: "Historical Recreation",
      }

      setGeneratedImages((prev) => [newImage, ...prev])
      setIsGenerating(false)
      setPrompt("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-500">
            <ImageIcon className="w-5 h-5" />
            Historical Visualization Generator
          </CardTitle>
          <CardDescription className="text-gray-400">
            Generate educational visualizations of ancient civilizations, historical events, and archaeological sites.
            All images are created for educational purposes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Describe a historical scene you'd like to visualize (e.g., 'Ancient Roman marketplace with merchants and citizens')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="bg-gray-800 border-gray-700 placeholder:text-gray-500"
            />

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              {isGenerating ? "Generating..." : "Generate Historical Visualization"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-500">
            <Palette className="w-5 h-5" />
            Suggested Historical Scenes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            {suggestedPrompts.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left h-auto p-3 justify-start border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setPrompt(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {generatedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-amber-500">Generated Visualizations</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {generatedImages.map((image) => (
              <Card key={image.id} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.prompt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">{image.prompt}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-gray-700 text-gray-300">
                        {image.civilization}
                      </Badge>
                      <Badge variant="outline" className="border-gray-700 text-gray-300">
                        {image.category}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card className="bg-blue-950/30 border-blue-900/30">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-400">
            <strong>Educational Note:</strong> Generated images are artistic interpretations based on historical
            research. They should be used as educational aids alongside verified historical sources and archaeological
            evidence.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Built by Calvin Kellerman Technologies</p>
      </div>
    </div>
  )
}
