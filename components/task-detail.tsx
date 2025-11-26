"use client"

import type { Task } from "@/app/page"
import { FileIcon, MessageCircle, Reply, Paperclip } from "lucide-react"

interface TaskDetailProps {
  task: Task
}

export default function TaskDetail({ task }: TaskDetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">Task Details</h2>
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">My Work Task</p>
        <p className="text-sm text-foreground leading-relaxed">{task.description}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Timeline</span>
          <span className="text-sm font-semibold">{task.date}</span>
        </div>

        {task.time && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Time</span>
            <span className="text-sm font-semibold">{task.time}</span>
          </div>
        )}

        {task.assignee && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Assignee</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <span className="text-sm font-semibold">{task.assignee}</span>
            </div>
          </div>
        )}

        {task.type && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Type</span>
            <span className="text-sm font-semibold">{task.type}</span>
          </div>
        )}
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
