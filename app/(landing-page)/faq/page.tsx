"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle, MessageSquare, CreditCard, Shield, Settings, Users, ShieldQuestion } from "lucide-react"
import Link from "next/link"
import HeroSection2 from "../_component/heroSection"

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
    // {
    //   title: "Monetization & Payments",
    //   icon: CreditCard,
    //   faqs: [
    //     {
    //       question: "How do I earn money on Xonnect?",
    //       answer:
    //         "Multiple revenue streams are available: subscriber tiers, one-time tips, premium content sales, merchandise integration, and sponsored content. We provide detailed analytics to track all revenue sources.",
    //     },
    //     {
    //       question: "When do I receive my earnings?",
    //       answer:
    //         "Earnings are processed weekly every Friday. Funds typically arrive in your account within 1-3 business days depending on your chosen payout method. You can track all transactions in your creator dashboard.",
    //     },
    //     {
    //       question: "Are there any hidden fees?",
    //       answer:
    //         "No hidden fees! Our 30% platform fee covers all transaction processing, hosting, and platform maintenance. Payment processor fees (typically 2.9% + $0.30) are clearly disclosed and deducted separately.",
    //     },
    //   ],
    // },
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
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <HeroSection2
      title=" "
      ICON={<ShieldQuestion className="w-5 h-5 text-red-400" />}
      iconTitle="Our FAQ "
    />

      {/* FAQ Categories */}
      <section className="py-10 lg:py-20 px-6 md:px-8">
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
                      className="bg-card backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-accent transition-colors"
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
                              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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

   

    </div>
  )
}

export default FAQPage
