"use client"

import { motion } from "framer-motion"
import { Heart, Award, Globe, Zap, Shield } from "lucide-react"
import Navigation from "../../../components/navigation"
import Footer from "../../../components/footer"

const AboutPage = () => {
  const team = [
    {
      name: "Alex Thompson",
      role: "CEO & Co-Founder",
      bio: "Former tech executive with 15+ years in digital platforms. Passionate about empowering creators.",
      image: "/ceo-headshot.png",
    },
    {
      name: "Sarah Kim",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer specializing in scalable streaming infrastructure and real-time systems.",
      image: "/professional-cto-headshot.png",
    },
    {
      name: "Marcus Johnson",
      role: "Head of Product",
      bio: "Product visionary with experience at YouTube and Twitch. Focused on creator-first experiences.",
      image: "/product-manager-headshot.png",
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Community",
      bio: "Community building expert who's helped grow some of the largest creator communities online.",
      image: "/professional-headshot-community-manager.png",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Creator-First",
      description: "Every decision we make puts creators and their communities at the center.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Building a safe, inclusive platform where everyone can express themselves freely.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries to deliver cutting-edge tools and experiences.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connecting creators and communities across cultures and continents.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/30 text-red-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm mb-8">
              <Heart className="w-4 h-4" />
              <span>Our Story</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                About Xonnect
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-8">
              Building the Future of Digital Connection
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We're a passionate team dedicated to revolutionizing how creators connect, collaborate, and monetize their
              content in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
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
              Our <span className="text-red-500">Mission</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To democratize content creation and community building by providing creators with the most powerful,
              intuitive, and accessible platform to share their passion with the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6">Why We Started Xonnect</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                In 2019, we saw talented creators struggling with fragmented tools, limited monetization options, and
                platforms that didn't truly understand their needs. We knew there had to be a better way.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Xonnect was born from the belief that every creator deserves access to professional-grade tools,
                meaningful community connections, and sustainable revenue streams - all in one unified platform.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <div className="font-semibold">Award-Winning Platform</div>
                  <div className="text-gray-400 text-sm">Recognized by TechCrunch and Product Hunt</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <h4 className="text-2xl font-bold mb-6">By the Numbers</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Creators</span>
                  <span className="text-2xl font-bold text-red-500">10,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Community Members</span>
                  <span className="text-2xl font-bold text-red-500">1M+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Content Hours Streamed</span>
                  <span className="text-2xl font-bold text-red-500">5M+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Creator Earnings</span>
                  <span className="text-2xl font-bold text-red-500">$50M+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="text-red-500">Values</span>
            </h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do at Xonnect.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our <span className="text-red-500">Team</span>
            </h2>
            <p className="text-xl text-gray-300">
              The passionate individuals building the future of creator platforms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-red-400 text-sm mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
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
              Join Our <span className="text-red-500">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Be part of the creator revolution. Start building your community today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="/creator/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                Start Creating
              </a>
              <a
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
