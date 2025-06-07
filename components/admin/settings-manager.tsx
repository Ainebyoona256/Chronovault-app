'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save, Trash2 } from "lucide-react"

interface Setting {
  id: string
  key: string
  value: string
  description: string | null
  updatedAt: Date
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newSetting, setNewSetting] = useState({
    key: '',
    value: '',
    description: ''
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const data = await response.json()
      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings')
    } finally {
      setLoading(false)
    }
  }

  const addSetting = async () => {
    if (!newSetting.key || !newSetting.value) {
      setError('Key and value are required')
      return
    }

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSetting)
      })

      if (!response.ok) throw new Error('Failed to add setting')
      
      const data = await response.json()
      setSettings([...settings, data])
      setNewSetting({ key: '', value: '', description: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add setting')
    }
  }

  const updateSetting = async (id: string, updates: Partial<Setting>) => {
    try {
      const response = await fetch(`/api/admin/settings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (!response.ok) throw new Error('Failed to update setting')
      
      const data = await response.json()
      setSettings(settings.map(setting => 
        setting.id === id ? { ...setting, ...data } : setting
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update setting')
    }
  }

  const deleteSetting = async (id: string) => {
    if (!confirm('Are you sure you want to delete this setting?')) return

    try {
      const response = await fetch(`/api/admin/settings/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete setting')
      
      setSettings(settings.filter(setting => setting.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete setting')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Manage global site settings and configurations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add New Setting Form */}
          <div className="p-4 bg-gray-800/50 rounded-lg space-y-4">
            <h3 className="font-medium">Add New Setting</h3>
            <Input
              placeholder="Setting Key"
              value={newSetting.key}
              onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
            />
            <Input
              placeholder="Setting Value"
              value={newSetting.value}
              onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
            />
            <Textarea
              placeholder="Description (optional)"
              value={newSetting.description}
              onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
            />
            <Button onClick={addSetting} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Setting
            </Button>
          </div>

          {/* Settings List */}
          <div className="space-y-4">
            {settings.map(setting => (
              <Card key={setting.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{setting.key}</h4>
                        {setting.description && (
                          <p className="text-sm text-gray-400">{setting.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteSetting(setting.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={setting.value}
                        onChange={(e) => updateSetting(setting.id, { value: e.target.value })}
                      />
                      <Button
                        size="sm"
                        onClick={() => updateSetting(setting.id, { value: setting.value })}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Last updated: {new Date(setting.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 