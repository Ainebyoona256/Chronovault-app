"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Book, Clock, ImageIcon, Settings, AlertTriangle, Camera, Heart, Bot } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import SearchVault from "@/components/search-vault"
import KnowledgeLibrary from "@/components/knowledge-library"
import ConspiracyTheories from "@/components/conspiracy-theories"
import Gallery from "@/components/gallery"
import Timeline from "@/components/timeline"
import Visualization from "@/components/visualization"
import AdminPanel from "@/components/admin/admin-panel"
import Donation from "@/components/donation"
import HistoricalAIAssistant from "@/components/ai-assistant"

export default function ChronoVault() {
  const [activeTab, setActiveTab] = React.useState("search")
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            {session?.user?.role === "ADMIN" ? (
              <div className="flex items-center gap-4">
                <span className="text-amber-400">Admin</span>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                  className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => signIn()}
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
              >
                Admin Access
              </Button>
            )}
          </div>
          <h1 className="text-4xl font-bold text-amber-500 mb-2">🧬 ChronoVault</h1>
          <p className="text-lg text-amber-400/80 mb-4">
            Educational Gateway to Ancient Civilizations & Historical Knowledge
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              Historical Research
            </Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              Ancient Civilizations
            </Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              Educational Content
            </Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              Critical Analysis
            </Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Main Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-gray-800/50">
            <TabsTrigger value="search" className="data-[state=active]:bg-gray-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger value="library" className="data-[state=active]:bg-gray-700">
              <Book className="w-4 h-4 mr-2" />
              Library
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-gray-700">
              <Clock className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gray-700">
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="theories" className="data-[state=active]:bg-gray-700">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Theories
            </TabsTrigger>
            <TabsTrigger value="visualization" className="data-[state=active]:bg-gray-700">
              <Camera className="w-4 h-4 mr-2" />
              Visualization
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-gray-700">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <SearchVault />
          </TabsContent>
          <TabsContent value="library">
            <KnowledgeLibrary />
          </TabsContent>
          <TabsContent value="timeline">
            <Timeline />
          </TabsContent>
          <TabsContent value="gallery">
            <Gallery />
          </TabsContent>
          <TabsContent value="theories">
            <ConspiracyTheories />
          </TabsContent>
          <TabsContent value="visualization">
            <Visualization />
          </TabsContent>
          <TabsContent value="ai">
            <HistoricalAIAssistant />
          </TabsContent>
        </Tabs>

        {/* Admin Panel */}
        {session?.user?.role === "ADMIN" && (
          <div className="mt-8">
            <AdminPanel />
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <Donation />
        </div>
      </div>
    </div>
  )
}
