"use client"

import { ChevronDown, ChevronRight, CheckSquare, Inbox, Calendar, Trash2, ChevronLeft } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const [workTaskExpanded, setWorkTaskExpanded] = useState(true)

  const menuItems = [
    { icon: CheckSquare, label: "Todo", active: true },
    { icon: Inbox, label: "Inbox", active: false },
    { icon: Calendar, label: "Calendar", active: false },
    { icon: Trash2, label: "Trash", active: false },
  ]

  if (collapsed) {
    return (
      <div className="w-16 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col items-center py-4 gap-4">
        <button onClick={onToggleCollapse} className="p-2 hover:bg-sidebar-accent rounded-lg">
          <ChevronRight size={20} />
        </button>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`p-2 rounded-lg hover:bg-sidebar-accent transition-colors ${
              item.active ? "bg-sidebar-accent text-sidebar-primary" : ""
            }`}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="w-52 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col overflow-y-auto">
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-400 rounded-full" />
          <span className="font-semibold">Kim's Space</span>
        </div>
        <button onClick={onToggleCollapse} className="p-1 hover:bg-sidebar-accent rounded">
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="text-xs font-semibold text-sidebar-foreground/60 mb-3 uppercase">General</div>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                item.active ? "bg-blue-500 text-white" : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 border-t border-sidebar-border pt-4">
        <div className="text-xs font-semibold text-sidebar-foreground/60 mb-3 uppercase">Task Progress</div>
        <button
          onClick={() => setWorkTaskExpanded(!workTaskExpanded)}
          className="w-full flex items-center gap-2 text-sm hover:bg-sidebar-accent px-3 py-2 rounded-lg transition-colors"
        >
          <ChevronDown size={16} className={`transition-transform ${workTaskExpanded ? "" : "-rotate-90"}`} />
          My Work Task
        </button>

        {workTaskExpanded && (
          <div className="ml-4 mt-2 space-y-2">
            <button className="w-full text-left text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground py-1 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              Debugging
            </button>
            <button className="w-full text-left text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground py-1 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              Coding
            </button>
            <button className="w-full text-left text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground py-1 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              Design
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
