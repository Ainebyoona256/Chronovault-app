'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  content: string
  category: string
  lastModified: string
}

export default function ContentManager() {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null)
  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
    category: ""
  })

  const handleAddContent = () => {
    if (!newContent.title || !newContent.content || !newContent.category) {
      alert("Please fill in all fields")
      return
    }

    const contentItem: ContentItem = {
      id: Date.now().toString(),
      ...newContent,
      lastModified: new Date().toISOString()
    }

    setContents([...contents, contentItem])
    setNewContent({ title: "", content: "", category: "" })
  }

  const handleUpdateContent = () => {
    if (!editingContent) return

    setContents(contents.map(content => 
      content.id === editingContent.id 
        ? { ...editingContent, lastModified: new Date().toISOString() }
        : content
    ))
    setEditingContent(null)
  }

  const handleDeleteContent = (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      setContents(contents.filter(content => content.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Add, edit, or remove content from ChronoVault</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Add New Content Form */}
            <div className="p-4 bg-gray-800/50 rounded-lg space-y-4">
              <h3 className="font-medium">Add New Content</h3>
              <Input
                placeholder="Title"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
              />
              <Input
                placeholder="Category"
                value={newContent.category}
                onChange={(e) => setNewContent({ ...newContent, category: e.target.value })}
              />
              <Textarea
                placeholder="Content"
                value={newContent.content}
                onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                className="min-h-[100px]"
              />
              <Button onClick={handleAddContent} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Content
              </Button>
            </div>

            {/* Content List */}
            <div className="space-y-4">
              <h3 className="font-medium">Existing Content</h3>
              {contents.map((content) => (
                <Card key={content.id}>
                  <CardContent className="pt-6">
                    {editingContent?.id === content.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editingContent.title}
                          onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                        />
                        <Input
                          value={editingContent.category}
                          onChange={(e) => setEditingContent({ ...editingContent, category: e.target.value })}
                        />
                        <Textarea
                          value={editingContent.content}
                          onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleUpdateContent} className="flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save
                          </Button>
                          <Button variant="outline" onClick={() => setEditingContent(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{content.title}</h4>
                            <p className="text-sm text-gray-400">{content.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingContent(content)}
                              className="flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteContent(content.id)}
                              className="flex items-center gap-1 text-red-500 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">{content.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Last modified: {new Date(content.lastModified).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 