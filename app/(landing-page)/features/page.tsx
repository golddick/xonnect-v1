"use client"

import { motion } from "framer-motion"
import {
  Video,
  Users,
  TrendingUp,
  MessageSquare,
  Shield,
  Globe,
  Zap,
  Star,
  Settings,
  BarChart3,
  Smartphone,
  Ticket,
  Film,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import FeaturesSection from "../_component/Feature-section"
import TestimonialSection from "../_component/Testimonial-section"
import HeroSection2 from "../_component/heroSection"

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: Video,
      title: " Live Streaming",
      description: "Broadcast premium events live to global audiences with xonnect streaming",
      features: [
        "4K streaming quality",
        "Ultra-low latency",
        "Multi-camera support",
        "Pay-per-view streaming",
      ],
      image: "/vibrant-music-community.png",
    },
    {
      icon: Users,
      title: "Community Building ",
      description: "Create vibrant communities and connect event attendees to enhance the experience.",
      features: [
        "Custom community spaces",
        "Attendee networking",
        // "Group coordination tools",
        "Role-based permissions",
        "Community analytics",
      ],
      image: "/community-dashboard-interface.png",
      // Floating chat widget component
      floatingWidget: (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-2xl w-64 border-border backdrop-blur-sm z-10"
        >
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-red-600 rounded-full mr-2 flex items-center justify-center">
              <span className="text-white text-xs font-bold">X</span>
            </div>
            <div className="font-medium text-foreground backdrop-blur-sm ">xonnect.hq</div>
          </div>
          <div className="bg-muted p-2 rounded-lg text-sm mb-3 text-foreground">
            Anyone else heading to Jiggy&apos;s concert tonight? 👀
          </div>
          <div className="bg-red-600 p-2 rounded-lg text-sm ml-auto max-w-[70%] text-right text-white">
            I&apos;ll be there! Leaving around 8 🎉
          </div>
        </motion.div>
      )
    },
    {
      icon: TrendingUp,
      title: " Monetization Suite",
      description: "Multiple revenue streams to help creators turn their passion into sustainable income.",
      features: [
        // "Subscription tiers",
        "Pay-per-view streaming",
        "Venue ticket sales",
        "Premium video on demand",
        "Revenue analytics",
      ],
      image: "/monetization-dashboard-with-charts.png",
    },
    {
      icon: Film,
      title: "Premium Video ",
      description: "Upload and sell premium movies and content to viewers who prefer home entertainment.",
      features: [
        "Cinema-quality streaming",
        "Digital rights management",
        "Multi-device compatibility",
      ],
      image: "/vibrant-concert.png",
    },
  ]

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: "Interactive Chat",
      description: "Real-time messaging with custom emotes, reactions, and moderation tools.",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Worldwide content delivery network ensuring fast streaming everywhere.",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive insights into your audience, engagement, and revenue.",
    },
    {
      icon: Ticket,
      title: "Ticket Management",
      description: "Seamless physical and digital ticket sales with secure verification.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
       <HeroSection2
          title=' '
          ICON={<Globe className="w-4 h-4 text-red-400" />}
          iconTitle="Our Features"
        />

      {/* Main Features */}
      <section className="  py-10 lg:py-20   px-6 md:px-8">
        <div className="max-w-6xl 2xl:max-w-[100rem] mx-auto">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center mb-32 ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{feature.title}</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3 mb-8">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""} relative`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
                {/* Render floating widget only for community feature */}
                {feature.floatingWidget}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-10 lg:py-20 px-6 md:px-8">
        <div className="max-w-6xl 2xl:max-w-[100rem]  mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete <span className="text-red-500">Feature Suite</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to succeed as a creator in one powerful platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-accent transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-10 lg:py-20 px-6 md:px-8">
        <TestimonialSection/>
      </section>

      {/* CTA Section */}
      <section className="py-10 lg:py-20 px-6 md:px-8">
        <div className="max-w-6xl 2xl:max-w-[100rem]  mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience <span className="text-red-500">All Features</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Start your free trial today and discover why thousands of creators choose Xonnect for premium event streaming, community building, and content monetization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/sign-up"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <Zap className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default FeaturesPage



















