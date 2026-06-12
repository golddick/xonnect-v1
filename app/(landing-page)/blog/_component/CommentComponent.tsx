"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageSquare, Send } from 'lucide-react'
import { BlogComment } from '@/lib/type/blog'
import { motion, AnimatePresence } from 'framer-motion'

interface CommentComponentProps {
  comments: BlogComment[]
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comments: initialComments }) => {
  const [comments, setComments] = useState<BlogComment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [visibleCount, setVisibleCount] = useState(2)

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: BlogComment = {
      id: Date.now().toString(),
      author: {
        name: 'Guest User',
        avatar: 'https://i.pravatar.cc/150?u=guest'
      },
      content: newComment,
      publishedAt: new Date().toISOString()
    }

    setComments([comment, ...comments])
    setNewComment('')
    // Keep visible count at least 2 if user just added one and it was empty before
    if (visibleCount < 2) setVisibleCount(2)
  }

  const showMore = () => {
    setVisibleCount(prev => prev + 10)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="mt-8 space-y-12">
      <div className="flex items-center gap-4 ">
        <MessageSquare className="w-8 h-8 text-red-500" />
        <h2 className="text-3xl font-black tracking-tight uppercase">Comments ({comments.length})</h2>
      </div>

      {/* Add Comment */}
      <div className="bg-card border border-border rounded-[2rem] p-6 space-y-4">
        <div className="flex gap-4">
          <Avatar className="w-12 h-12 border border-border">
            <AvatarImage src="https://i.pravatar.cc/150?u=guest" />
            <AvatarFallback>GU</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full bg-transparent border border-border rounded-2xl p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all min-h-[120px] resize-none"
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleAddComment}
                className="bg-white text-black hover:bg-stone-200 rounded-full px-8 py-6 font-black h-auto flex gap-2"
              >
                POST COMMENT <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {comments.slice(0, visibleCount).map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 rounded-[2.5rem] bg-card border border-border hover:border-red-500/30 transition-all group"
            >
              <div className="flex gap-4 mb-4">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-foreground">{comment.author.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{formatDate(comment.publishedAt)}</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg pl-14">
                {comment.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleCount < comments.length && (
          <div className="flex justify-center pt-8">
            <Button
              variant="outline"
              onClick={showMore}
              className="rounded-full px-10 py-6 border-stone-200 hover:bg-white hover:text-black font-bold h-auto uppercase tracking-widest"
            >
              Show More Comments
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentComponent
