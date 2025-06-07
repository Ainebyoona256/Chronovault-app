"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CivilizationNode {
  id: string
  name: string
  era: string
  region: string
  achievements: string[]
  connections: string[]
}

const CIVILIZATIONS: CivilizationNode[] = [
  {
    id: "sumerian",
    name: "Sumerian Civilization",
    era: "4500 BCE - 1750 BCE",
    region: "Mesopotamia",
    achievements: [
      "Writing system (Cuneiform)",
      "Urban planning",
      "Mathematics",
      "Astronomy",
      "Legal codes"
    ],
    connections: ["egyptian", "akkadian"]
  },
  {
    id: "egyptian",
    name: "Ancient Egyptian Civilization",
    era: "3150 BCE - 30 BCE",
    region: "Nile Valley",
    achievements: [
      "Pyramids",
      "Hieroglyphics",
      "Medicine",
      "Architecture",
      "Religious concepts"
    ],
    connections: ["sumerian", "greek"]
  },
  {
    id: "greek",
    name: "Ancient Greek Civilization",
    era: "800 BCE - 146 BCE",
    region: "Mediterranean",
    achievements: [
      "Democracy",
      "Philosophy",
      "Olympic Games",
      "Theater",
      "Scientific method"
    ],
    connections: ["egyptian", "roman"]
  }
]

const Visualization: React.FC = () => {
  const [selectedCivilization, setSelectedCivilization] = useState<string>(CIVILIZATIONS[0].id)
  const [viewMode, setViewMode] = useState<"list" | "connections">("list")

  const currentCiv = CIVILIZATIONS.find(civ => civ.id === selectedCivilization)
  const connectedCivs = currentCiv
    ? CIVILIZATIONS.filter(civ => currentCiv.connections.includes(civ.id))
    : []

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-amber-500">Civilization Visualizer</CardTitle>
          <CardDescription className="text-gray-400">
            Explore connections and achievements of ancient civilizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={selectedCivilization} onValueChange={setSelectedCivilization}>
              <SelectTrigger className="w-[250px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select civilization" />
              </SelectTrigger>
              <SelectContent>
                {CIVILIZATIONS.map(civ => (
                  <SelectItem key={civ.id} value={civ.id}>
                    {civ.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "list" ? "connections" : "list")}
              className="border-gray-700"
            >
              {viewMode === "list" ? "Show Connections" : "Show Details"}
            </Button>
          </div>

          {currentCiv && viewMode === "list" && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-amber-500">{currentCiv.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {currentCiv.era} • {currentCiv.region}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-amber-500 mb-3">Major Achievements</h3>
                <ul className="space-y-2">
                  {currentCiv.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500/50" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {currentCiv && viewMode === "connections" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-500">Connected Civilizations</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {connectedCivs.map(civ => (
                  <Card key={civ.id} className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-amber-500">{civ.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {civ.era} • {civ.region}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Notable achievements include {civ.achievements.slice(0, 2).join(" and ")}.
                      </p>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedCivilization(civ.id)}
                        className="mt-2 text-amber-500 hover:text-amber-400"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Visualization 