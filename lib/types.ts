export interface Project {
  id: string
  name: string
  description: string
  image?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  video?: {
    publicId: string
    cloudName: string
  }
}

export interface Skill {
  id: string
  name: string
  icon: string
  description: string
}

export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  type: string
  current: boolean
  description?: string
  highlights?: string[]
  skills: string[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface BackgroundData {
  education: string[]
  experience: string[]
  interests: string[]
}
