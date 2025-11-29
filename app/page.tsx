"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import Sidebar from "@/components/sidebar"
import TaskList from "@/components/task-list"
import TaskDetail from "@/components/task-detail"

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

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Code Review",
      description: "",
      date: "22 Jan 2023",
      tags: ["Dev"],
      completed: false,
    },
    {
      id: "2",
      title: "Meetings with Ragazo Company",
      description: "",
      date: "22 Jan 2023",
      tags: ["Meeting"],
      completed: false,
    },
    {
      id: "3",
      title: "Documenting on Github",
      description:
        "Create a documentation for Github projects, if you've created a project with successful, please documented on them.",
      date: "22 Jan 2023",
      time: "09:30",
      tags: ["Dev"],
      completed: false,
      assignee: "Emir",
      type: "Daily Task",
      attachments: [
        { name: "Ragazo and", date: "19 Apr 2024" },
        { name: "Ragazo java", date: "19 Apr 2024" },
        { name: "Ragazo csv", date: "19 Apr 2024" },
      ],
      comments: [
        {
          author: "Agus Subagyo",
          text: "Nice Emir, keep your good work, I will help you ASAP. Don't worry be happy!",
          time: "12:03",
        },
      ],
    },
    {
      id: "4",
      title: "Take a Break - Read & Eat",
      description: "",
      date: "22 Jan 2023",
      tags: ["Break"],
      completed: false,
    },
    {
      id: "5",
      title: "Doing Debugging for Dongle-Project",
      description: "",
      date: "22 Jan 2023",
      tags: [],
      completed: true,
    },
    {
      id: "6",
      title: "Code Review",
      description: "",
      date: "22 Jan 2023",
      tags: [],
      completed: true,
    },
    {
      id: "7",
      title: "Daily Sign",
      description: "",
      date: "22 Jan 2023",
      tags: [],
      completed: true,
    },
    {
      id: "8",
      title: "Test manually add task",
      description: "Manually add task",
      date: "22 Jan 2023",
      tags: [],
      completed: true,
    }
  ])

  const [selectedTaskId, setSelectedTaskId] = useState<string>("3")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const selectedTask = tasks.find((t) => t.id === selectedTaskId)

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "New Task",
      description: "",
      date: "22 Apr 2024",
      tags: [],
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Todo</h1>
              <button
                onClick={handleAddTask}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={20} />
                New Task
              </button>
            </div>

            <p className="text-muted-foreground mb-6">Today, 22 April</p>

            <div className="flex gap-4 border-b border-border pb-4">
              <button className="text-blue-500 font-medium hover:text-blue-600">List</button>
              <button className="text-muted-foreground hover:text-foreground">Board</button>
              <button className="text-muted-foreground hover:text-foreground">Timeline</button>
              <button className="text-muted-foreground hover:text-foreground">Calendar</button>
            </div>
          </div>

          <TaskList
            tasks={tasks}
            selectedTaskId={selectedTaskId}
            onSelectTask={setSelectedTaskId}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        {selectedTask && (
          <div className="w-80 border-l border-border p-6 overflow-y-auto bg-card">
            <TaskDetail task={selectedTask} onUpdateTask={handleUpdateTask} />
          </div>
        )}
      </div>
    </div>
  )
}
