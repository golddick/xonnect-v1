"use client"

import { motion } from "framer-motion"
import {
  DollarSign,
  Users,
  Globe,
  Zap,
  ShieldCheck,
  BarChart3,
  Heart,
  Tv,
  Ticket,
  MessageCircle,
  Star,
  Layers,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const creatorReasons = [
  {
    icon: DollarSign,
    title: "Keep More of What You Earn",
    description:
      " With Xonnect's pay-on-demand model, you set your own price and keep the vast majority of every sale. No middlemen, no hidden cuts just real money for real content.",
  },
  {
    icon: BarChart3,
    title: "Deep Audience Insights",
    description:
      "Know exactly who's watching, when they tune in, and what keeps them coming back. Our analytics dashboard gives you the data to grow smarter, not just harder.",
  },
  {
    icon: Layers,
    title: "Free & Paid Content, Your Way",
    description:
      "Mix free streams to grow your audience with premium paid events to monetize your best work. You decide what's free and what's exclusive every single time.",
  },
  {
    icon: Users,
    title: "Build a Loyal Community",
    description:
      "Create dedicated fan spaces, moderate discussions, and host interactive Q&As. Turn casual viewers into a passionate community that shows up for every stream.",
  },
  {
    icon: Zap,
    title: "Go Live in Seconds",
    description:
      "No complicated setup. Stream from your phone, laptop, or studio with one click. Xonnect handles the tech so you can focus on what you do best creating.",
  },
  {
    icon: Globe,
    title: "Reach a Global Audience",
    description:
      "Your content deserves a worldwide stage. Xonnect delivers your streams to viewers across the globe with high-quality, low-latency technology built for scale.",
  },
]

const viewerReasons = [
  {
    icon: Ticket,
    title: "Pay Only for What You Love",
    description:
      "No forced subscriptions. Browse freely and only pay for the specific events or streams you actually want to watch. Your money, your choice.",
  },
  {
    icon: Tv,
    title: "Watch on Any Screen",
    description:
      "From your big-screen TV to your phone on the go. Xonnect delivers crystal-clear streams on every device, anywhere in the world, without buffering.",
  },
  {
    icon: MessageCircle,
    title: "Be Part of the Action",
    description:
      "Live chat, real time polls, and direct Q&As with creators make every stream an experience, not just a broadcast. You're not just watching you're participating.",
  },
  {
    icon: Heart,
    title: "Discover Authentic Creators",
    description:
      "Find creators who share your passions music, gaming, tech, fitness, fashion and more. Xonnect surfaces real talent, not just the most advertised names.",
  },
  {
    icon: ShieldCheck,
    title: "Safe, Secure & Transparent",
    description:
      "Every transaction is protected. Know exactly what you're paying for before you pay. No surprise charges, no auto-renewals you didn't ask for.",
  },
  {
    icon: Star,
    title: "Exclusive Access to Live Events",
    description:
      "Get front-row seats to concerts, tournaments, masterclasses, and summits you can't find anywhere else all from the comfort of your home.",
  },
]

export default function WhyJoin() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="destructive" className="mb-4">Why Xonnect</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-foreground">
            More Reasons to Join
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you create content or consume it, Xonnect is built to give you more more control, more connection, more value.
          </p>
        </motion.div>

        {/* Creators */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-card" />
            <span className="text-sm font-bold uppercase tracking-widest text-red-500 px-3">For Creators</span>
            <div className="h-px flex-1 bg-card" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-card border border-border rounded-xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
                  <reason.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Viewers */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-bold uppercase tracking-widest text-red-500 px-3">For Viewers</span>
            <div className="h-px flex-1 bg-card" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewerReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-card border border-border rounded-xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
                  <reason.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
