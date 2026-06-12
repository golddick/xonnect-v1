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
} from "lucide-react"
import Navigation from "../../../components/navigation"
import Footer from "../../../components/footer"
import Link from "next/link"

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: Video,
      title: "Professional Live Streaming",
      description: "Broadcast in stunning 4K quality with ultra-low latency streaming technology.",
      features: [
        "4K streaming quality",
        "Ultra-low latency",
        "Multi-camera support",
        "Screen sharing",
        "Recording capabilities",
      ],
      image: "/professional-streaming-setup.png",
    },
    {
      icon: Users,
      title: "Community Building Tools",
      description: "Create and manage vibrant communities with powerful moderation and engagement features.",
      features: [
        "Custom community spaces",
        "Advanced moderation tools",
        "Member management",
        "Role-based permissions",
        "Community analytics",
      ],
      image: "/community-dashboard-interface.png",
    },
    {
      icon: TrendingUp,
      title: "Monetization Suite",
      description: "Multiple revenue streams to help creators turn their passion into sustainable income.",
      features: [
        "Subscription tiers",
        "One-time tips",
        "Premium content",
        "Merchandise integration",
        "Revenue analytics",
      ],
      image: "/monetization-dashboard-with-charts.png",
    },
  ]

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: "Interactive Chat",
      description: "Real-time messaging with custom emotes, reactions, and moderation tools.",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Enterprise-grade security with content protection and privacy controls.",
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
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android apps for streaming and community management.",
    },
    {
      icon: Settings,
      title: "Custom Branding",
      description: "Personalize your channel with custom themes, logos, and branding.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
              <br />
              <span className="text-red-500">Built for Creators</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Everything you need to create, connect, and monetize your content. From professional streaming to
              community building, we've got you covered.
            </p>

            <Link
              href="/creator/signup"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              <span>Try All Features Free</span>
              <Zap className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
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
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3 mb-8">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/creator/signup"
                  className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              And Much <span className="text-red-500">More</span>
            </h2>
            <p className="text-xl text-gray-300">
              Discover all the tools and features that make Xonnect the ultimate creator platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
          >
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-300 mb-8 italic">
              "Xonnect has everything I need as a creator. The streaming quality is incredible, the community tools are
              powerful, and the monetization features have helped me build a sustainable business."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img src="/creator-profile-photo.png" alt="Creator" className="w-12 h-12 rounded-full" />
              <div className="text-left">
                <div className="font-semibold">Alex Rivera</div>
                <div className="text-red-400 text-sm">Gaming Creator • 500K followers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
              Start your free trial today and discover why thousands of creators choose Xonnect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/creator/signup"
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

      <Footer />
    </div>
  )
}

export default FeaturesPage
