export interface Project {
  id: string
  name: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface Skill {
  id: string
  name: string
  icon: string
  description: string
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
