"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
  category: string
  significance: string
}

const INITIAL_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    title: "Rise of Sumerian Civilization",
    date: "4500 BCE",
    description: "The emergence of the world's first civilization in Mesopotamia.",
    category: "Ancient Civilizations",
    significance: "First known human civilization"
  },
  {
    id: "2",
    title: "Great Pyramid of Giza Construction",
    date: "2560 BCE",
    description: "Construction of the Great Pyramid of Giza, the oldest and largest of the three pyramids in the Giza pyramid complex.",
    category: "Architecture",
    significance: "One of the Seven Wonders of the Ancient World"
  },
  {
    id: "3",
    title: "Birth of Democracy in Athens",
    date: "508 BCE",
    description: "Cleisthenes introduces democratic reforms in Athens, establishing the world's first democratic political system.",
    category: "Politics",
    significance: "Foundation of modern democratic systems"
  }
]

const Timeline: React.FC = () => {
  const [events] = useState<TimelineEvent[]>(INITIAL_EVENTS)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const filteredEvents = events
    .filter(event => 
      (selectedCategory === "all" || event.category === selectedCategory) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       event.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.date.replace(" BCE", " BC")).getTime()
      const dateB = new Date(b.date.replace(" BCE", " BC")).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  const categories = Array.from(new Set(events.map(event => event.category)))

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-amber-500">Historical Timeline</CardTitle>
          <CardDescription className="text-gray-400">
            Explore significant events throughout human history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="border-gray-700"
            >
              {sortOrder === "asc" ? "Oldest First" : "Newest First"}
            </Button>
          </div>

          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="relative pl-8 pb-8">
                {/* Timeline line */}
                {index !== filteredEvents.length - 1 && (
                  <div className="absolute left-[11px] top-[30px] bottom-0 w-[2px] bg-amber-500/20" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-[6px] w-6 h-6 rounded-full bg-amber-500/20 border-2 border-amber-500" />
                
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-amber-500">{event.title}</CardTitle>
                        <CardDescription className="text-gray-400">{event.date}</CardDescription>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {event.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-2">{event.description}</p>
                    <p className="text-sm text-amber-500/70">Significance: {event.significance}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Timeline
