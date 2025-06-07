"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    title: "Ancient Civilizations",
    description: "Explore the mysteries of past civilizations",
    articles: [
      { title: "The Rise and Fall of Ancient Egypt", date: "2024-03-01" },
      { title: "Lost Cities of the Maya", date: "2024-02-28" },
      { title: "Roman Engineering Marvels", date: "2024-02-25" },
    ]
  },
  {
    title: "Historical Mysteries",
    description: "Uncover unexplained historical events",
    articles: [
      { title: "The Lost Colony of Roanoke", date: "2024-03-02" },
      { title: "Mysteries of the Nazca Lines", date: "2024-02-27" },
      { title: "The Voynich Manuscript", date: "2024-02-24" },
    ]
  },
  {
    title: "Archaeological Discoveries",
    description: "Recent findings and excavations",
    articles: [
      { title: "New Tomb Discovered in Valley of Kings", date: "2024-03-03" },
      { title: "Ancient Technology Unearthed", date: "2024-02-26" },
      { title: "Underwater Cities Found", date: "2024-02-23" },
    ]
  }
]

export default function KnowledgeLibrary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category.title} className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-amber-500">{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.articles.map((article) => (
                <div key={article.title} className="border-b border-gray-700 pb-3 last:border-0">
                  <h4 className="text-sm font-medium text-gray-200 hover:text-amber-400 cursor-pointer">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{article.date}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Articles
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
