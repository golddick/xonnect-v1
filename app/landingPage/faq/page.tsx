"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle, MessageSquare, CreditCard, Shield, Settings, Users } from "lucide-react"
import Navigation from "../../../components/navigation"
import Footer from "../../../components/footer"
import Link from "next/link"

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqCategories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      faqs: [
        {
          question: "What is Xonnect and how does it work?",
          answer:
            "Xonnect is a comprehensive creator platform that combines live streaming, community building, and monetization tools. Creators can broadcast content, build engaged communities, and earn revenue through subscriptions, tips, and premium content sales.",
        },
        {
          question: "How do I create an account?",
          answer:
            "Simply click 'Get Started' on our homepage and follow the three-step signup process. You'll provide basic information, set up your creator profile, and verify your account. The entire process takes less than 5 minutes.",
        },
        {
          question: "Is Xonnect free to use?",
          answer:
            "Yes! We offer a free Starter plan that includes 5 hours of streaming per month, basic community features, and standard video quality. You can upgrade to paid plans for unlimited streaming and advanced features.",
        },
        {
          question: "What equipment do I need to start streaming?",
          answer:
            "You can start with just a computer and webcam. For better quality, we recommend a dedicated microphone, good lighting, and a stable internet connection. Our technical guide provides detailed equipment recommendations for every budget.",
        },
      ],
    },
    {
      title: "Streaming & Content",
      icon: MessageSquare,
      faqs: [
        {
          question: "What streaming quality does Xonnect support?",
          answer:
            "We support streaming up to 4K resolution with ultra-low latency. Free accounts get 720p, Creator plans include 1080p HD, and Pro plans offer 4K streaming with advanced encoding options.",
        },
        {
          question: "Can I stream to multiple platforms simultaneously?",
          answer:
            "Yes! Pro plan subscribers can use our multi-streaming feature to broadcast to Xonnect and other platforms simultaneously, maximizing your reach while maintaining your Xonnect community.",
        },
        {
          question: "How does content moderation work?",
          answer:
            "We provide comprehensive moderation tools including automated filters, community moderators, timeout/ban capabilities, and AI-powered content detection. You have full control over your community's standards.",
        },
        {
          question: "Can I upload pre-recorded videos?",
          answer:
            "In addition to live streaming, you can upload videos, create premium content libraries, and schedule content releases. All plans include video hosting and management tools.",
        },
      ],
    },
    {
      title: "Monetization & Payments",
      icon: CreditCard,
      faqs: [
        {
          question: "How do I earn money on Xonnect?",
          answer:
            "Multiple revenue streams are available: subscriber tiers, one-time tips, premium content sales, merchandise integration, and sponsored content. We provide detailed analytics to track all revenue sources.",
        },
        {
          question: "What are the payout rates and fees?",
          answer:
            "We take a competitive 5% platform fee on all transactions. Creators keep 95% of their earnings. Payouts are processed weekly via PayPal, bank transfer, or cryptocurrency, with no minimum threshold.",
        },
        {
          question: "When do I receive my earnings?",
          answer:
            "Earnings are processed weekly every Friday. Funds typically arrive in your account within 1-3 business days depending on your chosen payout method. You can track all transactions in your creator dashboard.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No hidden fees! Our 5% platform fee covers all transaction processing, hosting, and platform maintenance. Payment processor fees (typically 2.9% + $0.30) are clearly disclosed and deducted separately.",
        },
      ],
    },
    {
      title: "Community & Features",
      icon: Users,
      faqs: [
        {
          question: "How do community features work?",
          answer:
            "Create custom community spaces with member tiers, exclusive content, discussion forums, and events. Advanced moderation tools help maintain healthy communities, while analytics show engagement metrics.",
        },
        {
          question: "Can I customize my channel appearance?",
          answer:
            "Yes! Creator and Pro plans include custom branding options: upload logos, choose color schemes, create custom overlays, and design unique channel layouts that reflect your brand identity.",
        },
        {
          question: "What analytics and insights are available?",
          answer:
            "Comprehensive analytics include viewer demographics, engagement metrics, revenue tracking, growth trends, and community insights. Export data for external analysis or integrate with third-party tools.",
        },
        {
          question: "How does the mobile app work?",
          answer:
            "Our mobile apps (iOS and Android) allow full streaming capabilities, community management, and viewer interaction. Stream directly from your phone with the same quality and features as desktop.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: Settings,
      faqs: [
        {
          question: "What internet speed do I need for streaming?",
          answer:
            "Minimum 5 Mbps upload for 720p, 10 Mbps for 1080p, and 25 Mbps for 4K streaming. We recommend having 50% more bandwidth than required for stable streaming. Our speed test tool helps optimize your setup.",
        },
        {
          question: "How do I troubleshoot streaming issues?",
          answer:
            "Our help center includes step-by-step troubleshooting guides, video tutorials, and diagnostic tools. Common issues like dropped frames, audio sync, and connection problems have detailed solutions.",
        },
        {
          question: "Is my content and data secure?",
          answer:
            "Yes! We use enterprise-grade security with end-to-end encryption, secure data centers, and regular security audits. Your content is protected with DRM, and personal data follows GDPR compliance standards.",
        },
        {
          question: "How do I contact support?",
          answer:
            "Multiple support channels: live chat (24/7 for Pro users), email support, community forums, and comprehensive documentation. Response times: Free users within 24 hours, paid users within 4 hours.",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      faqs: [
        {
          question: "How is my personal information protected?",
          answer:
            "We follow strict privacy policies and GDPR compliance. Personal data is encrypted, never sold to third parties, and you have full control over what information is shared publicly on your profile.",
        },
        {
          question: "Can I control who sees my content?",
          answer:
            "Set streams to public, subscriber-only, or private. Create member tiers with different access levels, schedule content releases, and use geographic restrictions if needed.",
        },
        {
          question: "What happens to my content if I cancel?",
          answer:
            "You retain full ownership of your content. Before canceling, you can download all videos, export community data, and transfer followers to other platforms. Content remains accessible for 30 days after cancellation.",
        },
        {
          question: "How do you handle copyright issues?",
          answer:
            "We have automated copyright detection systems and clear DMCA procedures. Creators receive guidance on music licensing, fair use, and content creation best practices to avoid copyright issues.",
        },
      ],
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
                Frequently Asked
              </span>
              <br />
              <span className="text-red-500">Questions</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Find answers to common questions about Xonnect. Can't find what you're looking for? Contact our support
              team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                Contact Support
              </Link>
              <Link
                href="/creator/signup"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-3xl font-bold">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex
                  const isOpen = openItems.includes(globalIndex)

                  return (
                    <div
                      key={faqIndex}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
                      >
                        <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <Minus className="w-5 h-5 text-red-400" />
                          ) : (
                            <Plus className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6">
                              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              Still Have <span className="text-red-500">Questions</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                Contact Support
              </Link>
              <Link
                href="/help"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Help Center
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FAQPage
