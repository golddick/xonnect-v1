"use client"

import { motion } from "framer-motion"
import { Heart, Award, Globe, Zap, Shield } from "lucide-react"
import AboutBannerHeader from "./about-banner-header"

const AboutPageExample = () => {
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
      <AboutBannerHeader />

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
    </div>
  )
}

export default AboutPageExample
