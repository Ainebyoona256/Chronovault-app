"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera } from "lucide-react"

const images = [
  {
    title: "Ancient Egyptian Hieroglyphs",
    description: "Wall paintings from the Valley of Kings",
    category: "Artifacts",
    date: "1500 BCE",
    location: "Luxor, Egypt",
    url: "/images/hieroglyphs.jpg"
  },
  {
    title: "Mayan Temple Complex",
    description: "Aerial view of Chichen Itza",
    category: "Architecture",
    date: "600-900 CE",
    location: "Yucatan, Mexico",
    url: "/images/chichen-itza.jpg"
  },
  {
    title: "Roman Colosseum",
    description: "Ancient amphitheater at sunset",
    category: "Architecture",
    date: "70-80 CE",
    location: "Rome, Italy",
    url: "/images/colosseum.jpg"
  },
  {
    title: "Dead Sea Scrolls",
    description: "Ancient Hebrew manuscripts",
    category: "Artifacts",
    date: "150 BCE - 70 CE",
    location: "Qumran Caves",
    url: "/images/dead-sea-scrolls.jpg"
  }
]

export default function Gallery() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Historical Image Gallery
          </h2>
          <p className="text-gray-400">Visual documentation of historical artifacts and sites</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Upload Image</Button>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.title} className="bg-gray-800/50 border-gray-700">
            <div className="aspect-video relative bg-gray-900">
              {/* Image placeholder - in a real app, use next/image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                <Camera className="w-8 h-8" />
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-amber-500">{image.title}</CardTitle>
                <Badge variant="outline" className="bg-gray-900/30 text-gray-400 border-gray-700">
                  {image.category}
                </Badge>
              </div>
              <CardDescription>{image.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{image.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{image.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-950/30 border-blue-900/30">
        <CardContent className="p-4">
          <p className="text-sm text-blue-400">
            <strong>Note:</strong> All images in this gallery are for educational purposes. Please respect copyright and usage rights when sharing or downloading images.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 