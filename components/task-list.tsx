"use client"

import type { Task } from "@/lib/types"
import { Trash2 } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  selectedTaskId: string
  onSelectTask: (id: string) => void
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Dev: { bg: "bg-purple-100", text: "text-purple-700" },
  Meeting: { bg: "bg-orange-100", text: "text-orange-700" },
  Break: { bg: "bg-amber-100", text: "text-amber-700" },
}

export default function TaskList({ tasks, selectedTaskId, onSelectTask, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-2 p-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onSelectTask(task.id)}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedTaskId === task.id
                ? "bg-blue-500 text-white"
                : task.completed
                  ? "bg-muted text-muted-foreground hover:bg-muted/80"
                  : "bg-background hover:bg-muted border border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleTask(task.id)
                }}
                className="mt-1 flex-shrink-0"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-blue-500 border-blue-500"
                      : selectedTaskId === task.id
                        ? "border-white"
                        : "border-border hover:border-blue-500"
                  }`}
                >
                  {task.completed && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
              </button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium truncate ${
                    selectedTaskId === task.id
                      ? "text-white"
                      : task.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className={selectedTaskId === task.id ? "text-blue-100" : "text-muted-foreground"}>
                    {task.date}
                  </span>
                  {task.tags.map((tag) => {
                    const colors = TAG_COLORS[tag] || { bg: "bg-gray-100", text: "text-gray-700" }
                    return (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded ${
                          selectedTaskId === task.id ? "bg-blue-400 text-white" : `${colors.bg} ${colors.text}`
                        }`}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </div>

              {selectedTaskId === task.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteTask(task.id)
                  }}
                  className="flex-shrink-0 text-white hover:text-red-200"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
