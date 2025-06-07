"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Search, Download, Eye, X, Star, Globe, Zap, Shield, AlertTriangle } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  era: string
  location: string
  credibility: "verified" | "disputed" | "speculative" | "hoax"
  tags: string[]
  imageUrl: string
  source: string
  dateAdded: string
}

const ancientImages: GalleryImage[] = [
  {
    id: "ai1",
    title: "Great Pyramid of Giza",
    description: "The last remaining Wonder of the Ancient World, showcasing advanced engineering techniques.",
    category: "Ancient Architecture",
    subcategory: "Egyptian",
    era: "2580 BCE",
    location: "Giza, Egypt",
    credibility: "verified",
    tags: ["pyramid", "engineering", "wonder", "limestone"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Great+Pyramid+of+Giza",
    source: "Archaeological Survey",
    dateAdded: "2024-01-15",
  },
  {
    id: "ai2",
    title: "Göbekli Tepe Pillars",
    description: "Mysterious megalithic structures predating Stonehenge by thousands of years.",
    category: "Ancient Architecture",
    subcategory: "Neolithic",
    era: "9500 BCE",
    location: "Turkey",
    credibility: "verified",
    tags: ["megalith", "neolithic", "pillars", "carvings"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Gobekli+Tepe+Pillars",
    source: "Archaeological Excavation",
    dateAdded: "2024-01-20",
  },
  {
    id: "ai3",
    title: "Sumerian Cuneiform Tablets",
    description: "Ancient writing system containing creation myths and historical records.",
    category: "Ancient Texts",
    subcategory: "Mesopotamian",
    era: "3200 BCE",
    location: "Iraq",
    credibility: "verified",
    tags: ["cuneiform", "writing", "clay", "literature"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Cuneiform+Tablets",
    source: "Museum Collection",
    dateAdded: "2024-01-25",
  },
  {
    id: "ai4",
    title: "Nazca Lines",
    description: "Massive geoglyphs in the Peruvian desert, purpose still debated by scholars.",
    category: "Ancient Art",
    subcategory: "Pre-Columbian",
    era: "500-500 CE",
    location: "Peru",
    credibility: "verified",
    tags: ["geoglyphs", "desert", "lines", "aerial"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Nazca+Lines",
    source: "Aerial Photography",
    dateAdded: "2024-02-01",
  },
  {
    id: "ai5",
    title: "Easter Island Moai",
    description: "Monolithic human figures carved by the Rapa Nui people.",
    category: "Ancient Sculptures",
    subcategory: "Polynesian",
    era: "1250-1500 CE",
    location: "Easter Island",
    credibility: "verified",
    tags: ["moai", "statues", "volcanic", "polynesian"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Easter+Island+Moai",
    source: "Archaeological Documentation",
    dateAdded: "2024-02-05",
  },
  {
    id: "ai6",
    title: "Antikythera Mechanism",
    description: "Ancient Greek analog computer used for astronomical calculations.",
    category: "Ancient Technology",
    subcategory: "Greek",
    era: "100 BCE",
    location: "Greece",
    credibility: "verified",
    tags: ["mechanism", "computer", "bronze", "astronomy"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Antikythera+Mechanism",
    source: "Museum Artifact",
    dateAdded: "2024-02-10",
  },
]

const conspiracyImages: GalleryImage[] = [
  {
    id: "ci1",
    title: "Alleged UFO Hieroglyphs",
    description: "Egyptian temple carvings that some interpret as depicting flying vehicles.",
    category: "Ancient Aliens",
    subcategory: "Egyptian",
    era: "1300 BCE",
    location: "Abydos, Egypt",
    credibility: "disputed",
    tags: ["hieroglyphs", "ufo", "temple", "carvings"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=UFO+Hieroglyphs",
    source: "Temple Photography",
    dateAdded: "2024-01-30",
  },
  {
    id: "ci2",
    title: "Puma Punku Precision Cuts",
    description: "Precisely cut stone blocks that some claim require advanced technology.",
    category: "Ancient Technology",
    subcategory: "Pre-Columbian",
    era: "600 CE",
    location: "Bolivia",
    credibility: "disputed",
    tags: ["precision", "stone", "cutting", "technology"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Puma+Punku+Stones",
    source: "Archaeological Site",
    dateAdded: "2024-02-15",
  },
  {
    id: "ci3",
    title: "Reptilian Statue Claims",
    description: "Ancient statues that some interpret as depicting reptilian beings.",
    category: "Reptilian Theory",
    subcategory: "Various",
    era: "Various",
    location: "Global",
    credibility: "speculative",
    tags: ["reptilian", "statues", "serpent", "mythology"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Reptilian+Statues",
    source: "Various Museums",
    dateAdded: "2024-02-20",
  },
  {
    id: "ci4",
    title: "Moon Landing Studio Set",
    description: "Alleged evidence of moon landing being filmed in a studio.",
    category: "Space Hoax",
    subcategory: "Modern",
    era: "1969",
    location: "USA (alleged)",
    credibility: "hoax",
    tags: ["moon", "studio", "filming", "hoax"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Moon+Landing+Studio",
    source: "Conspiracy Claims",
    dateAdded: "2024-02-25",
  },
  {
    id: "ci5",
    title: "Chemtrail Grid Patterns",
    description: "Aircraft contrails forming grid patterns, claimed to be chemical spraying.",
    category: "Environmental Control",
    subcategory: "Modern",
    era: "1990s-Present",
    location: "Global",
    credibility: "hoax",
    tags: ["chemtrails", "aircraft", "grid", "contrails"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Chemtrail+Grid",
    source: "Sky Photography",
    dateAdded: "2024-03-01",
  },
  {
    id: "ci6",
    title: "Illuminati Symbolism",
    description: "Alleged Illuminati symbols in architecture and media.",
    category: "Secret Societies",
    subcategory: "Modern",
    era: "1776-Present",
    location: "Global",
    credibility: "speculative",
    tags: ["illuminati", "symbols", "pyramid", "eye"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Illuminati+Symbols",
    source: "Various Sources",
    dateAdded: "2024-03-05",
  },
]

const artifactImages: GalleryImage[] = [
  {
    id: "ar1",
    title: "Dead Sea Scrolls",
    description: "Ancient Jewish religious manuscripts discovered in caves near the Dead Sea.",
    category: "Ancient Texts",
    subcategory: "Hebrew",
    era: "300 BCE - 100 CE",
    location: "Israel/Palestine",
    credibility: "verified",
    tags: ["scrolls", "manuscripts", "hebrew", "religious"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Dead+Sea+Scrolls",
    source: "Archaeological Discovery",
    dateAdded: "2024-01-10",
  },
  {
    id: "ar2",
    title: "Rosetta Stone",
    description: "Key to deciphering Egyptian hieroglyphs, containing the same text in three scripts.",
    category: "Ancient Texts",
    subcategory: "Egyptian",
    era: "196 BCE",
    location: "Egypt",
    credibility: "verified",
    tags: ["rosetta", "hieroglyphs", "translation", "stone"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Rosetta+Stone",
    source: "British Museum",
    dateAdded: "2024-01-12",
  },
  {
    id: "ar3",
    title: "Terracotta Army",
    description: "Thousands of life-sized terracotta soldiers buried with China's first emperor.",
    category: "Ancient Sculptures",
    subcategory: "Chinese",
    era: "210 BCE",
    location: "China",
    credibility: "verified",
    tags: ["terracotta", "army", "emperor", "burial"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Terracotta+Army",
    source: "Archaeological Excavation",
    dateAdded: "2024-01-18",
  },
  {
    id: "ar4",
    title: "Mayan Crystal Skulls",
    description: "Crystal skulls claimed to be of Mayan origin, though most are modern fakes.",
    category: "Disputed Artifacts",
    subcategory: "Mayan",
    era: "Modern (claimed ancient)",
    location: "Various",
    credibility: "hoax",
    tags: ["crystal", "skulls", "mayan", "fake"],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Crystal+Skulls",
    source: "Various Collections",
    dateAdded: "2024-02-28",
  },
]

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterCredibility, setFilterCredibility] = useState("all")

  const allImages = [...ancientImages, ...conspiracyImages, ...artifactImages]

  const filteredImages = allImages.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = filterCategory === "all" || image.category === filterCategory
    const matchesCredibility = filterCredibility === "all" || image.credibility === filterCredibility

    return matchesSearch && matchesCategory && matchesCredibility
  })

  const getCredibilityColor = (credibility: string) => {
    switch (credibility) {
      case "verified":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "disputed":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
      case "speculative":
        return "bg-orange-900/30 text-orange-400 border-orange-500/30"
      case "hoax":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryIcon = (category: string) => {
    if (category.includes("Ancient")) return <Star className="w-4 h-4" />
    if (category.includes("Secret")) return <Eye className="w-4 h-4" />
    if (category.includes("Technology")) return <Zap className="w-4 h-4" />
    if (category.includes("Control")) return <Shield className="w-4 h-4" />
    if (category.includes("Space")) return <Globe className="w-4 h-4" />
    return <AlertTriangle className="w-4 h-4" />
  }

  const ImageCard = ({ image }: { image: GalleryImage }) => (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gray-900/50 border-gray-800 group"
      onClick={() => setSelectedImage(image)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.imageUrl || "/placeholder.svg"}
          alt={image.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className={getCredibilityColor(image.credibility)}>
            {image.credibility}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-gray-900/80 text-gray-300 border-gray-700">
            {image.era}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
          {getCategoryIcon(image.category)}
          {image.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{image.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{image.location}</span>
          <span>{image.category}</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-500">
            <Camera className="w-5 h-5" />
            Ancient & Conspiracy Photo Gallery
          </CardTitle>
          <CardDescription className="text-gray-400">
            A comprehensive visual collection of ancient artifacts, archaeological discoveries, and conspiracy theory
            related imagery. All images are categorized by credibility and source verification.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search images, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
            >
              <option value="all">All Categories</option>
              <option value="Ancient Architecture">Ancient Architecture</option>
              <option value="Ancient Texts">Ancient Texts</option>
              <option value="Ancient Art">Ancient Art</option>
              <option value="Ancient Technology">Ancient Technology</option>
              <option value="Ancient Sculptures">Ancient Sculptures</option>
              <option value="Ancient Aliens">Ancient Aliens</option>
              <option value="Secret Societies">Secret Societies</option>
              <option value="Space Hoax">Space Hoax</option>
              <option value="Environmental Control">Environmental Control</option>
              <option value="Disputed Artifacts">Disputed Artifacts</option>
            </select>
            <select
              value={filterCredibility}
              onChange={(e) => setFilterCredibility(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
            >
              <option value="all">All Credibility Levels</option>
              <option value="verified">Verified</option>
              <option value="disputed">Disputed</option>
              <option value="speculative">Speculative</option>
              <option value="hoax">Hoax</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Credibility Legend */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-amber-500">Image Credibility Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-900/30 text-green-400 border-green-500/30">Verified</Badge>
              <span className="text-sm text-gray-400">Authenticated artifacts</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-500/30">Disputed</Badge>
              <span className="text-sm text-gray-400">Debated authenticity</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-900/30 text-orange-400 border-orange-500/30">Speculative</Badge>
              <span className="text-sm text-gray-400">Unverified claims</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-900/30 text-red-400 border-red-500/30">Hoax</Badge>
              <span className="text-sm text-gray-400">Proven false</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
            All Images ({allImages.length})
          </TabsTrigger>
          <TabsTrigger value="ancient" className="data-[state=active]:bg-gray-700">
            Ancient ({ancientImages.length})
          </TabsTrigger>
          <TabsTrigger value="conspiracy" className="data-[state=active]:bg-gray-700">
            Conspiracy ({conspiracyImages.length})
          </TabsTrigger>
          <TabsTrigger value="artifacts" className="data-[state=active]:bg-gray-700">
            Artifacts ({artifactImages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ancient" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ancientImages
              .filter(
                (image) =>
                  (filterCategory === "all" || image.category === filterCategory) &&
                  (filterCredibility === "all" || image.credibility === filterCredibility) &&
                  (searchTerm === "" ||
                    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
              )
              .map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="conspiracy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {conspiracyImages
              .filter(
                (image) =>
                  (filterCategory === "all" || image.category === filterCategory) &&
                  (filterCredibility === "all" || image.credibility === filterCredibility) &&
                  (searchTerm === "" ||
                    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
              )
              .map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="artifacts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {artifactImages
              .filter(
                (image) =>
                  (filterCategory === "all" || image.category === filterCategory) &&
                  (filterCredibility === "all" || image.credibility === filterCredibility) &&
                  (searchTerm === "" ||
                    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
              )
              .map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-amber-500 flex items-center gap-2">
                  {getCategoryIcon(selectedImage.category)}
                  {selectedImage.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className={getCredibilityColor(selectedImage.credibility)}>
                  {selectedImage.credibility}
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-300">
                  {selectedImage.category}
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-300">
                  {selectedImage.era}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src={selectedImage.imageUrl || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full max-h-96 object-contain rounded-lg bg-gray-800"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">Description</h4>
                    <p className="text-gray-300">{selectedImage.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-amber-400">Location: </span>
                      <span className="text-gray-300">{selectedImage.location}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-400">Era: </span>
                      <span className="text-gray-300">{selectedImage.era}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-400">Source: </span>
                      <span className="text-gray-300">{selectedImage.source}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-400">Subcategory: </span>
                      <span className="text-gray-300">{selectedImage.subcategory}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Eye className="w-4 h-4 mr-2" />
                    View Source
                  </Button>
                </div>

                {selectedImage.credibility !== "verified" && (
                  <div className="mt-4 p-4 bg-yellow-950/30 rounded-lg border border-yellow-900/30">
                    <p className="text-sm text-yellow-400">
                      <strong>Credibility Notice:</strong> This image is marked as "{selectedImage.credibility}". Always
                      verify information through multiple credible sources and think critically about claims.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredImages.length === 0 && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="text-center py-8">
            <p className="text-gray-400">No images found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Built by Calvin Kellerman Technologies</p>
      </div>
    </div>
  )
}
