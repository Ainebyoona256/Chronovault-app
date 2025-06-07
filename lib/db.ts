export interface ContentItem {
  id: string
  title: string
  content: string
  category: string
  lastModified: string
}

const STORAGE_KEY = 'chronovault-contents'

export const db = {
  getContents: (): ContentItem[] => {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading contents:', error)
      return []
    }
  },

  saveContents: (contents: ContentItem[]): void => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contents))
    } catch (error) {
      console.error('Error saving contents:', error)
    }
  },

  addContent: (content: Omit<ContentItem, 'id' | 'lastModified'>): ContentItem => {
    const newContent: ContentItem = {
      id: Date.now().toString(),
      ...content,
      lastModified: new Date().toISOString()
    }
    
    const contents = db.getContents()
    contents.push(newContent)
    db.saveContents(contents)
    
    return newContent
  },

  updateContent: (id: string, updates: Partial<ContentItem>): ContentItem | null => {
    const contents = db.getContents()
    const index = contents.findIndex(c => c.id === id)
    
    if (index === -1) return null
    
    const updatedContent = {
      ...contents[index],
      ...updates,
      lastModified: new Date().toISOString()
    }
    
    contents[index] = updatedContent
    db.saveContents(contents)
    
    return updatedContent
  },

  deleteContent: (id: string): boolean => {
    const contents = db.getContents()
    const newContents = contents.filter(c => c.id !== id)
    
    if (newContents.length === contents.length) return false
    
    db.saveContents(newContents)
    return true
  }
} 