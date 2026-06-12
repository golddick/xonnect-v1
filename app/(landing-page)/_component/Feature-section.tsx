"use client"

import { motion } from "framer-motion"
import { Globe, MessageSquare, Shield, Smartphone, TrendingUp, Users, Video } from "lucide-react"

const FeaturesSection = () => {
  return (
    <div>
            <div className="max-w-[120rem]  mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to <span className="text-red-500">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From live streaming to community building, we provide all the tools creators need to thrive in the digital
              economy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "Live Streaming",
                description: "Professional-grade streaming with HD quality, real-time chat, and interactive features.",
              },
              {
                icon: Users,
                title: "Community Building",
                description: "Create and manage vibrant communities with advanced moderation and engagement tools.",
              },
              {
                icon: TrendingUp,
                title: "Monetization",
                description:
                  "Multiple revenue streams including subscriptions, tips, premium content, and merchandise.",
              },
              {
                icon: MessageSquare,
                title: "Interactive Chat",
                description: "Real-time messaging with emotes, reactions, and community-driven conversations.",
              },
              {
                icon: Smartphone,
                title: "Any Device, Anywhere",
                description: "Optimized for TVs, laptops, and mobile phones, ensuring a seamless experience for you and your family.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Connect with creators and audiences worldwide, breaking down geographical barriers for live events.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card backdrop-blur-sm border border-border rounded-2xl p-8 hover:bg-card/80 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default FeaturesSection