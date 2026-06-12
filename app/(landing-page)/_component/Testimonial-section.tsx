"use client"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import React from 'react'

const TestimonialSection = () => {
  return (
    <div>
        <div className="max-w-6xl 2xl:max-w-[100rem]   mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by <span className="text-red-500">Creators</span>
            </h2>
            <p className="text-xl text-muted-foreground">See what our community has to say about their Xonnect experience.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Music Creator",
                content:
                  "Xonnect has transformed how I connect with my audience. The streaming quality is incredible and the monetization features have helped me turn my passion into a sustainable career.",
                rating: 5,
              },
              {
                name: "Marcus Chen",
                role: "Gaming Streamer",
                content:
                  "The community features are game-changing. I can now build deeper relationships with my viewers and create exclusive content that keeps them coming back.",
                rating: 5,
              },
              {
                name: "Elena Rodriguez",
                role: "Art Instructor",
                content:
                  "As an educator, Xonnect's interactive tools have made my online workshops more engaging than ever. My students love the real-time feedback features.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card backdrop-blur-sm border border-border rounded-2xl p-8 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-red-400 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default TestimonialSection
