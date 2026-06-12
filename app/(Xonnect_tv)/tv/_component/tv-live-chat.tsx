"use client"

import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ChatMessage {
  id: string
  author: string
  avatar: string
  role: "streamer" | "moderator" | "subscriber" | "user"
  message: string
  timestamp: Date
}

const TvLiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      author: "StreamerName",
      avatar: "🎬",
      role: "streamer",
      message: "Welcome to the stream! Thanks for joining!",
      timestamp: new Date(),
    },
    {
      id: "2",
      author: "Viewer123",
      avatar: "👤",
      role: "user",
      message: "This is awesome! Love the content",
      timestamp: new Date(),
    },
    {
      id: "3",
      author: "PremiumSub",
      avatar: "⭐",
      role: "subscriber",
      message: "Great stream today!",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [slowMode, setSlowMode] = useState(false)
  const [subscribersOnly, setSubscribersOnly] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        author: "You",
        avatar: "👤",
        role: "user",
        message: inputValue,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputValue("")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "streamer":
        return "text-red-400"
      case "moderator":
        return "text-green-400"
      case "subscriber":
        return "text-purple-400"
      default:
        return "text-foreground"
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "streamer":
        return "🎬"
      case "moderator":
        return "🛡️"
      case "subscriber":
        return "⭐"
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full bg-background/30  rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 ">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-foreground">Live Chat</h3>
          <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded">2.3K</span>
        </div>
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Chat Status Indicators */}
      {(slowMode || subscribersOnly) && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10 space-y-1">
          {slowMode && <p className="text-xs text-yellow-400">⏱️ Slow mode is active - wait before sending messages</p>}
          {subscribersOnly && <p className="text-xs text-purple-400">⭐ Subscribers only mode is active</p>}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm space-y-1 hover:bg-white/5 p-2 rounded transition-colors group"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{msg.avatar}</span>
                <span className={`font-semibold ${getRoleColor(msg.role)}`}>{msg.author}</span>
                {getRoleBadge(msg.role) && <span className="text-xs">{getRoleBadge(msg.role)}</span>}
                <span className="text-xs text-gray-600">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-400 ml-8">{msg.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Send a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm"
          />
          <button onClick={handleSendMessage} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
            <Send className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <p className="text-xs text-gray-500">💬 Chat rules: Keep it respectful and fun!</p>
      </div>
    </div>
  )
}

export default TvLiveChat

