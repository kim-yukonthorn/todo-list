export interface Task {
  id: string
  title: string
  description: string
  date: string
  time?: string
  tags: string[]
  completed: boolean
  assignee?: string
  type?: string
  attachments?: Array<{ name: string; date: string }>
  comments?: Array<{ author: string; text: string; time: string }>
}

