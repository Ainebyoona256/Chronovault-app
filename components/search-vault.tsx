"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, AlertTriangle } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  content: string
  source: string
  category: "verified" | "theoretical" | "speculative"
  civilization: string
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Sumerian Creation Myths",
    content:
      "The Enuma Elish is a Babylonian creation myth that describes the birth of the gods and the creation of the world. Archaeological evidence supports the existence of these texts from around 1100 BCE.",
    source: "Enuma Elish - Cuneiform tablets",
    category: "verified",
    civilization: "Mesopotamian",
  },
  {
    id: "2",
    title: "Egyptian Pyramid Construction",
    content:
      "Recent archaeological discoveries suggest sophisticated engineering techniques were used in pyramid construction, including ramp systems and precise mathematical calculations.",
    source: "Archaeological surveys - Giza complex",
    category: "verified",
    civilization: "Egyptian",
  },
  {
    id: "3",
    title: "Atlantis References",
    content:
      "Plato's dialogues Timaeus and Critias describe Atlantis as a philosophical allegory. No archaeological evidence has been found to support its literal existence.",
    source: "Plato's Dialogues (c. 360 BCE)",
    category: "speculative",
    civilization: "Greek",
  },
]

export default function SearchVault() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filteredResults)
      setIsLoading(false)
    }, 1000)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "verified":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "theoretical":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
      case "speculative":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "verified":
        return <BookOpen className="w-4 h-4" />
      case "theoretical":
        return <Search className="w-4 h-4" />
      case "speculative":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-500">
            <Search className="w-5 h-5" />
            Search the Historical Vault
          </CardTitle>
          <CardDescription className="text-gray-400">
            Ask questions about ancient civilizations, historical events, and archaeological discoveries. Results are
            categorized by evidence level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search historical records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-gray-800 border-gray-700"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              variant="default"
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            <Badge variant="outline" className="bg-green-900/20 border-green-500/30 text-green-400">
              <BookOpen className="w-3 h-3 mr-1" />
              Verified - Archaeological/Historical evidence
            </Badge>
            <Badge variant="outline" className="bg-yellow-900/20 border-yellow-500/30 text-yellow-400">
              <Search className="w-3 h-3 mr-1" />
              Theoretical - Academic hypothesis
            </Badge>
            <Badge variant="outline" className="bg-red-900/20 border-red-500/30 text-red-400">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Speculative - Unverified claims
            </Badge>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-amber-500">Search Results</h3>
          {searchResults.map((result) => (
            <Card key={result.id} className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-amber-400">{result.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-gray-700 text-gray-300">
                      {result.civilization}
                    </Badge>
                    <Badge variant="outline" className={getCategoryColor(result.category)}>
                      {getCategoryIcon(result.category)}
                      <span className="ml-1 capitalize">{result.category}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-3">{result.content}</p>
                <p className="text-sm text-gray-400">
                  <strong>Source:</strong> {result.source}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !isLoading && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="text-center py-8">
            <p className="text-gray-400">No results found. Try a different search term.</p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Built by Calvin Kellerman Technologies</p>
      </div>
    </div>
  )
}
