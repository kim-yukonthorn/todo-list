"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import Sidebar from "@/components/sidebar"
import TaskDetail from "@/components/task-detail"
import type { Task } from "@/lib/types"

export default function BoardPage() {
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
    },
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
    setSelectedTaskId(newTask.id)
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const todoTasks = tasks.filter((t) => !t.completed)
  const doneTasks = tasks.filter((t) => t.completed)

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Kanban Board</h1>
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
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                List
              </Link>
              <Link href="/board" className="text-blue-500 font-medium hover:text-blue-600">
                Board
              </Link>
              <button className="text-muted-foreground hover:text-foreground" type="button">
                Timeline
              </button>
              <button className="text-muted-foreground hover:text-foreground" type="button">
                Calendar
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <KanbanColumn
                title="To Do"
                count={todoTasks.length}
                tasks={todoTasks}
                selectedTaskId={selectedTaskId}
                onSelectTask={setSelectedTaskId}
                onToggleTask={handleToggleTask}
              />
              <KanbanColumn
                title="Completed"
                count={doneTasks.length}
                tasks={doneTasks}
                selectedTaskId={selectedTaskId}
                onSelectTask={setSelectedTaskId}
                onToggleTask={handleToggleTask}
              />
            </div>
          </div>
        </div>

        {selectedTask && (
          <div className="w-80 border-l border-border p-6 overflow-y-auto bg-card">
            <TaskDetail
              task={selectedTask}
              onUpdateTask={(id, updates) => {
                setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)))
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

interface KanbanColumnProps {
  title: string
  count: number
  tasks: Task[]
  selectedTaskId: string
  onSelectTask: (id: string) => void
  onToggleTask: (id: string) => void
}

function KanbanColumn({ title, count, tasks, selectedTaskId, onSelectTask, onToggleTask }: KanbanColumnProps) {
  return (
    <div className="flex flex-col h-full bg-muted/40 rounded-lg border border-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{title}</h2>
          <span className="inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
            {count}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => onSelectTask(task.id)}
            className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
              selectedTaskId === task.id
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-background border-border hover:bg-muted"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{task.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className={selectedTaskId === task.id ? "text-blue-100" : "text-muted-foreground"}>
                    {task.date}
                  </span>
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded ${
                        selectedTaskId === task.id
                          ? "bg-blue-400 text-white"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleTask(task.id)
                }}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed ? "bg-blue-500 border-blue-500" : "border-border"
                }`}
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed && <span className="w-2 h-2 rounded-full bg-white" />}
              </button>
            </div>
          </button>
        ))}

        {tasks.length === 0 && (
          <p className="text-xs text-muted-foreground px-1 py-2">No tasks in this column.</p>
        )}
      </div>
    </div>
  )
}

