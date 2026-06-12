"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, CheckCircle, Users, Zap, TrendingUp, Shield, HelpCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  subsections: {
    id: string
    title: string
    content: string[]
  }[]
}

const ManualPage = () => {
  const [expandedSection, setExpandedSection] = useState<string>("creators")
  const [expandedSubsection, setExpandedSubsection] = useState<string>("getting-started")

  const sections: Section[] = [
    {
      id: "creators",
      title: "Creator Guide",
      icon: <Zap className="w-6 h-6" />,
      subsections: [
        {
          id: "getting-started",
          title: "Getting Started",
          content: [
            "Account Creation: Sign up for a Xonnect creator account by visiting the creator signup page. Verify your email address and complete your profile with a profile picture, bio, and social links.",
            "Profile Customization: Personalize your creator profile with a banner image, description, and links to your other social media channels. This helps viewers understand your content focus.",
            "Account Verification: Complete the identity verification process to unlock monetization features. This typically takes 24-48 hours.",
          ],
        },
        {
          id: "content-creation",
          title: "Content Creation & Uploading",
          content: [
            "Video Upload: Upload pre-recorded videos through the creator dashboard. Supported formats include MP4, WebM, and MOV. Maximum file size is 100GB.",
            "Live Streaming: Start a live stream directly from the Xonnect studio or use RTMP encoders like OBS. Set titles, descriptions, and choose privacy settings before going live.",
            "Stream Settings: Configure resolution (up to 4K), bitrate, and frame rate. We recommend 1080p at 60fps for optimal viewing experience.",
          ],
        },
        {
          id: "monetization",
          title: "Monetization Options",
          content: [
            "Ad Revenue: Earn revenue from ads displayed on your videos. Earnings depend on viewer engagement and geography. Ad revenue is typically 70% to creator, 30% to Xonnect.",
            "Subscriptions: Offer subscription tiers to your viewers. Set custom tier names and prices (minimum $0.99/month). Subscribers get exclusive content and badges.",
            "Donations: Accept direct support from viewers through tipping. Set custom tip amounts and receive 80% of donations.",
            "Pay-Per-View Events: Host special events or premium streams where viewers pay to access. You set the price and keep 85% of revenue.",
            "Tickets & Events: Create physical or digital tickets for events, workshops, or seminars. Manage inventory and track purchases through the dashboard.",
          ],
        },
        {
          id: "community-management",
          title: "Community Building",
          content: [
            "Communities: Create dedicated communities around your content. Members get exclusive access to community chats and content.",
            "Moderators: Appoint community moderators to help manage discussions and enforce community guidelines.",
            "Engagement Tools: Use polls, Q&A, and live chat features to engage with your audience during streams.",
            "Followers: Build your follower base by creating consistent, quality content. Followers receive notifications when you go live.",
          ],
        },
        {
          id: "analytics",
          title: "Analytics & Performance",
          content: [
            "Video Analytics: Track views, watch time, engagement rate, and audience demographics for each video. Identify trends to improve content.",
            "Stream Analytics: Monitor real-time viewer counts, average watch duration, and engagement during live streams.",
            "Audience Insights: See where your viewers are from, what devices they use, and what times they engage most.",
            "Revenue Reports: Track earnings from all monetization sources with detailed breakdowns by date and revenue type.",
          ],
        },
        {
          id: "payouts",
          title: "Payouts & Payments",
          content: [
            "Payout Methods: Connect your bank account or PayPal for withdrawals. Minimum payout is $10.",
            "Payout Schedule: Earnings are calculated monthly and paid on the 15th of the following month.",
            "Tax Information: Provide tax information required by your country. 1099 forms are available for US creators.",
            "Payment History: Track all payments, pending earnings, and transaction details in your dashboard.",
          ],
        },
      ],
    },
    {
      id: "viewers",
      title: "Viewer Guide",
      icon: <Users className="w-6 h-6" />,
      subsections: [
        {
          id: "account-setup",
          title: "Account Setup",
          content: [
            "Creating an Account: Sign up using email or social media. Complete your profile with a username, profile picture, and bio.",
            "Preferences: Set your content preferences, notification settings, and privacy options.",
            "Verification: Verify your email to unlock all features including commenting and purchasing.",
          ],
        },
        {
          id: "discovering-content",
          title: "Discovering Content",
          content: [
            "Homepage: Browse featured creators, trending content, and personalized recommendations.",
            "Explore: Use advanced filters to find content by category, creator, or type (live, video, events).",
            "Search: Search for specific creators, videos, or topics using the search bar.",
            "Following: Follow your favorite creators to receive notifications when they go live or upload new content.",
          ],
        },
        {
          id: "watching-content",
          title: "Watching Content",
          content: [
            "Videos: Watch on-demand videos in various qualities from 360p to 4K. Adjust settings for your internet speed.",
            "Live Streams: Join live streams to interact with creators in real-time. Use live chat to comment and engage.",
            "Watch History: Your watch history is saved for easy access to videos you've watched.",
          ],
        },
        {
          id: "purchasing-tickets",
          title: "Purchasing Tickets & Events",
          content: [
            "Browsing Tickets: View all available tickets and events on the Tickets page. Filter by category, price, and date.",
            "Ticket Details: Read full event information including date, time, location, and ticket benefits.",
            "Purchasing: Select ticket quantity and type (VIP, Standard, etc.). Proceed to checkout and choose payment method.",
            "Digital Tickets: Receive digital tickets via email with QR codes for scanning at events.",
            "Refunds: Refund policies vary by event. Check the event details for refund information.",
          ],
        },
        {
          id: "subscriptions",
          title: "Subscriptions & Memberships",
          content: [
            "Choosing Tiers: Browse subscription tiers offered by creators and select the one that fits your needs.",
            "Benefits: Enjoy exclusive content, member-only streams, and special perks based on your subscription tier.",
            "Managing Subscriptions: Update, pause, or cancel subscriptions anytime from your dashboard.",
            "Billing: Subscription charges appear on your statement monthly on the subscription date.",
          ],
        },
        {
          id: "community-interaction",
          title: "Community & Interaction",
          content: [
            "Joining Communities: Join creator communities to access exclusive discussions and content.",
            "Commenting: Leave comments on videos to share your thoughts. Creators can pin or highlight your comment.",
            "Tipping: Support creators directly through tips and donations.",
            "Reporting: Report inappropriate content or behavior to our moderation team.",
          ],
        },
      ],
    },
    {
      id: "partnerships",
      title: "Partnership Guide",
      icon: <TrendingUp className="w-6 h-6" />,
      subsections: [
        {
          id: "overview",
          title: "Partnership Overview",
          content: [
            "Enterprise Program: Xonnect offers partnerships for brands, agencies, and organizations looking to reach our audience.",
            "Partnership Models: Choose from sponsorships, co-branded events, revenue sharing, or custom arrangements.",
            "Benefits: Get access to premium analytics, dedicated support, and cross-promotion opportunities.",
          ],
        },
        {
          id: "applying",
          title: "Applying for Partnership",
          content: [
            "Submission: Submit your partnership proposal through the Enterprise Partnership page.",
            "Requirements: Provide company information, partnership goals, and proposed collaboration details.",
            "Review: Our partnership team reviews applications and contacts you within 5 business days.",
            "Approval: Once approved, you'll work with our team to finalize terms and launch your partnership.",
          ],
        },
        {
          id: "opportunities",
          title: "Partnership Opportunities",
          content: [
            "Sponsored Content: Have creators produce content featuring your brand or product.",
            "Events: Co-host virtual or in-person events with our creators and audience.",
            "Affiliate Program: Earn commissions by referring new creators or viewers to Xonnect.",
            "API Access: Integrate Xonnect with your platform through our API.",
            "Advertising: Purchase advertising placements on the platform to reach our audience.",
          ],
        },
        {
          id: "support",
          title: "Partner Support",
          content: [
            "Dedicated Account Manager: Partners receive a dedicated point of contact for all needs.",
            "Custom Reports: Access detailed analytics and performance reports for your campaigns.",
            "Priority Support: Get faster response times and priority handling of issues.",
            "Quarterly Reviews: Regular check-ins to ensure partnership goals are being met.",
          ],
        },
      ],
    },
    {
      id: "platform",
      title: "Platform Features",
      icon: <Shield className="w-6 h-6" />,
      subsections: [
        {
          id: "safety",
          title: "Safety & Security",
          content: [
            "Content Moderation: We use both AI and human moderators to keep the platform safe and appropriate.",
            "Community Guidelines: All users must follow our community guidelines. Violations result in warnings or account suspension.",
            "Reporting: Report inappropriate content, harassment, or other issues directly from the platform.",
            "Privacy: Your personal data is protected with industry-standard encryption and security measures.",
            "Two-Factor Authentication: Enable 2FA on your account for additional security.",
          ],
        },
        {
          id: "technical",
          title: "Technical Details",
          content: [
            "Streaming Technology: We use adaptive bitrate streaming for optimal playback quality based on your connection.",
            "Platforms: Xonnect is available on web, iOS, and Android with full feature parity.",
            "Offline Support: Access your library and read manuals offline on mobile apps.",
            "API: Developers can build third-party applications using our API. See api.xonnect.com for documentation.",
          ],
        },
        {
          id: "policies",
          title: "Policies & Terms",
          content: [
            "Terms of Service: All users must agree to our Terms of Service when creating an account.",
            "Privacy Policy: Learn how we collect, use, and protect your data in our Privacy Policy.",
            "Copyright: Content must not infringe on third-party copyrights. Violations result in removal and potential account suspension.",
            "DMCA: We respond to DMCA takedown notices in accordance with the Digital Millennium Copyright Act.",
          ],
        },
      ],
    },
  ]

  const currentSection = sections.find((s) => s.id === expandedSection)
  const currentSubsection = currentSection?.subsections.find((sub) => sub.id === expandedSubsection)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Xonnect Platform Manual
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive guides covering creators, viewers, partnerships, and platform features. Everything you need
              to know to succeed on Xonnect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manual Content */}
      <section className="relative z-10 py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      setExpandedSection(section.id)
                      setExpandedSubsection(section.subsections[0]?.id)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                      expandedSection === section.id
                        ? "bg-red-600 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {currentSection && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Section Tabs */}
                  <div className="mb-8 flex flex-col sm:flex-row gap-2 overflow-x-auto pb-2">
                    {currentSection.subsections.map((subsection) => (
                      <motion.button
                        key={subsection.id}
                        onClick={() => setExpandedSubsection(subsection.id)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 font-medium ${
                          expandedSubsection === subsection.id
                            ? "bg-red-600 text-white"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {subsection.title}
                      </motion.button>
                    ))}
                  </div>

                  {/* Content */}
                  {currentSubsection && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <h2 className="text-3xl font-bold mb-6">{currentSubsection.title}</h2>
                      {currentSubsection.content.map((paragraph, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <CheckCircle className="w-5 h-5 text-red-600" />
                          </div>
                          <p className="text-gray-300 leading-relaxed">{paragraph}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-600/30 rounded-2xl p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-red-600" />
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-8">Check out our FAQ section or contact support for additional help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/faq"
                className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <span>View FAQ</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all backdrop-blur-sm border border-white/20"
              >
                <span>Contact Support</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ManualPage
