import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Book,
  Video,
  MessageCircle,
  Users,
  Settings,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react"




const quickActions = [
  {
    icon: MessageCircle,
    title: "Contact Support",
    description: "Get help from our support team",
    action: "Chat Now",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch step-by-step guides",
    action: "Watch Now",
    link:"/tutorials"
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with other users",
    action: "Join Discussion",
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
        {/* <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>
      
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                      How can we{" "}
                    </span>
                    <br />
                    <span className="text-red-500">help</span> you?
                  </h1>
      
                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
                     Find answers to your questions, learn how to use Xonnect effectively, and get the support you need to
              succeed.
                  </p>
                </motion.div>
              </div>
            </section> */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              How can we{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">help</span> you?
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Find answers to your questions, learn how to use Xonnect effectively, and get the support you need to
              succeed.
            </p>

          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-black border-none">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:border-red-600 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{action.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{action.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 bg-transparent"
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Quick answers to common questions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-white/5 border-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">How do I create my first community?</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Creating a community is easy! Go to your dashboard, click "Create Community," fill in the basic
                      information like name and description, set your community rules, and you're ready to start
                      inviting members.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      What's the difference between free and premium plans?
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Free plans include basic community features for up to 100 members. Premium plans offer unlimited
                      members, advanced moderation tools, custom branding, analytics, and priority support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Can I monetize my community?</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Yes! Xonnect offers multiple monetization options including premium content
                      tiers, virtual events, and direct fan support through tips and donations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      How do I moderate my community effectively?
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Use our built-in moderation tools including automated content filtering, member reporting,
                      role-based permissions, and community guidelines. You can also appoint trusted members as
                      moderators.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Is my data secure on Xonnect?</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Absolutely. We use enterprise-grade security measures including end-to-end encryption, regular
                      security audits, and comply with GDPR and other privacy regulations to protect your data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-black border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Still Need Help?</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Our support team is here to help you succeed. Get personalized assistance from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-10 py-4 h-auto">
              Contact Support
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 h-auto border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Join Community Forum
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
