"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/lib/types"
import { FileIcon, MessageCircle, Reply, Paperclip, Edit2, Check, X } from "lucide-react"

interface TaskDetailProps {
  task: Task
  onUpdateTask: (id: string, updates: Partial<Task>) => void
}

export default function TaskDetail({ task, onUpdateTask }: TaskDetailProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [editedDate, setEditedDate] = useState(task.date)
  const [isEditingTime, setIsEditingTime] = useState(false)
  const [editedTime, setEditedTime] = useState(task.time || "")
  const [isEditingAssignee, setIsEditingAssignee] = useState(false)
  const [editedAssignee, setEditedAssignee] = useState(task.assignee || "")
  const [isEditingType, setIsEditingType] = useState(false)
  const [editedType, setEditedType] = useState(task.type || "")

  useEffect(() => {
    setEditedDescription(task.description)
    setIsEditingDescription(false)
    setEditedDate(task.date)
    setIsEditingDate(false)
    setEditedTime(task.time || "")
    setIsEditingTime(false)
    setEditedAssignee(task.assignee || "")
    setIsEditingAssignee(false)
    setEditedType(task.type || "")
    setIsEditingType(false)
  }, [task.id, task.description, task.date, task.time, task.assignee, task.type])

  const handleSaveDescription = () => {
    onUpdateTask(task.id, { description: editedDescription })
    setIsEditingDescription(false)
  }

  const handleCancelEdit = () => {
    setEditedDescription(task.description)
    setIsEditingDescription(false)
  }

  const handleSaveDate = () => {
    onUpdateTask(task.id, { date: editedDate })
    setIsEditingDate(false)
  }

  const handleCancelDate = () => {
    setEditedDate(task.date)
    setIsEditingDate(false)
  }

  const handleSaveTime = () => {
    onUpdateTask(task.id, { time: editedTime || undefined })
    setIsEditingTime(false)
  }

  const handleCancelTime = () => {
    setEditedTime(task.time || "")
    setIsEditingTime(false)
  }

  const handleSaveAssignee = () => {
    onUpdateTask(task.id, { assignee: editedAssignee || undefined })
    setIsEditingAssignee(false)
  }

  const handleCancelAssignee = () => {
    setEditedAssignee(task.assignee || "")
    setIsEditingAssignee(false)
  }

  const handleSaveType = () => {
    onUpdateTask(task.id, { type: editedType || undefined })
    setIsEditingType(false)
  }

  const handleCancelType = () => {
    setEditedType(task.type || "")
    setIsEditingType(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">Task Details</h2>
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">My Work Task</p>
          {!isEditingDescription && (
            <button
              onClick={() => setIsEditingDescription(true)}
              className="text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="Edit description"
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
        {isEditingDescription ? (
          <div className="space-y-2">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 text-sm text-foreground leading-relaxed border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDescription}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Check size={14} />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {task.description || "No description. Click edit to add one."}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Timeline</span>
          {isEditingDate ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="px-2 py-1 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleSaveDate}
                className="text-blue-500 hover:text-blue-600"
                aria-label="Save date"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelDate}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{task.date}</span>
              <button
                onClick={() => setIsEditingDate(true)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="Edit date"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Time</span>
          {isEditingTime ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                placeholder="e.g., 09:30"
                className="px-2 py-1 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleSaveTime}
                className="text-blue-500 hover:text-blue-600"
                aria-label="Save time"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelTime}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{task.time || "Not set"}</span>
              <button
                onClick={() => setIsEditingTime(true)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="Edit time"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Assignee</span>
          {isEditingAssignee ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedAssignee}
                onChange={(e) => setEditedAssignee(e.target.value)}
                placeholder="Assignee name"
                className="px-2 py-1 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleSaveAssignee}
                className="text-blue-500 hover:text-blue-600"
                aria-label="Save assignee"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelAssignee}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {task.assignee ? (
                <>
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  <span className="text-sm font-semibold">{task.assignee}</span>
                </>
              ) : (
                <span className="text-sm font-semibold text-muted-foreground">Not assigned</span>
              )}
              <button
                onClick={() => setIsEditingAssignee(true)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="Edit assignee"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Type</span>
          {isEditingType ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedType}
                onChange={(e) => setEditedType(e.target.value)}
                placeholder="e.g., Daily Task"
                className="px-2 py-1 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleSaveType}
                className="text-blue-500 hover:text-blue-600"
                aria-label="Save type"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelType}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{task.type || "Not set"}</span>
              <button
                onClick={() => setIsEditingType(true)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="Edit type"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {task.attachments && task.attachments.length > 0 && (
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Paperclip size={16} />
            Attachment
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {task.attachments.map((attachment, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 p-3 bg-background rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <FileIcon size={24} className="text-muted-foreground" />
                <div className="text-center">
                  <p className="text-xs font-medium truncate">{attachment.name}</p>
                  <p className="text-xs text-muted-foreground">{attachment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {task.comments && task.comments.length > 0 && (
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <MessageCircle size={16} />
            Comments
          </h3>
          <div className="space-y-3">
            {task.comments.map((comment, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.time}</p>
                  </div>
                  <p className="text-sm text-foreground mt-1">{comment.text}</p>
                  <button className="text-xs text-blue-500 hover:text-blue-600 mt-2 flex items-center gap-1">
                    <Reply size={12} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
