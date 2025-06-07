"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

const theories = [
  {
    title: "Ancient Astronauts",
    description: "The theory that ancient civilizations were visited by extraterrestrial beings.",
    evidence: "Ancient artwork, megalithic structures, religious texts",
    proponents: ["Erich von Däniken", "Giorgio A. Tsoukalos"],
    category: "Ancient History"
  },
  {
    title: "Lost Advanced Civilizations",
    description: "Claims of technologically advanced ancient civilizations that were lost to history.",
    evidence: "Underwater structures, ancient maps, architectural similarities",
    proponents: ["Graham Hancock", "Robert Bauval"],
    category: "Pre-History"
  },
  {
    title: "Hidden Archaeological Discoveries",
    description: "Allegations of suppressed archaeological findings that challenge mainstream history.",
    evidence: "Disputed artifacts, controversial dating methods",
    proponents: ["Michael Cremo", "Klaus Dona"],
    category: "Archaeology"
  }
]

export default function ConspiracyTheories() {
  return (
    <div className="space-y-6">
      <div className="bg-red-950/30 border border-red-900/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-semibold">Critical Thinking Required</h3>
        </div>
        <p className="text-sm text-red-400">
          The theories presented here are alternative interpretations of historical events and archaeological findings. 
          They are not supported by mainstream academic consensus. Please approach with critical thinking and verify claims through reliable academic sources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {theories.map((theory) => (
          <Card key={theory.title} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-amber-500">{theory.title}</CardTitle>
                <Badge variant="outline" className="bg-yellow-900/30 text-yellow-400 border-yellow-500/30">
                  {theory.category}
                </Badge>
              </div>
              <CardDescription>{theory.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">Claimed Evidence:</h4>
                  <p className="text-sm text-gray-400">{theory.evidence}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">Notable Proponents:</h4>
                  <div className="flex flex-wrap gap-2">
                    {theory.proponents.map((proponent) => (
                      <Badge key={proponent} variant="outline" className="bg-gray-900/30 text-gray-400 border-gray-700">
                        {proponent}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-950/30 border-blue-900/30">
        <CardContent className="p-4">
          <p className="text-sm text-blue-400">
            <strong>Educational Note:</strong> While these theories can be interesting to explore, it's important to:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Verify claims through peer-reviewed academic sources</li>
              <li>Consider the evidence objectively</li>
              <li>Understand the difference between speculation and proven facts</li>
              <li>Maintain a balanced perspective while exploring alternative theories</li>
            </ul>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
