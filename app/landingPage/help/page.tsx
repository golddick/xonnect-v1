import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

const helpCategories = [
  {
    icon: Users,
    title: "Getting Started",
    description: "Learn the basics of using Xonnect",
    articles: 12,
    color: "bg-blue-600",
  },
  {
    icon: Video,
    title: "Content Creation",
    description: "Tips for creating engaging content",
    articles: 18,
    color: "bg-green-600",
  },
  {
    icon: MessageCircle,
    title: "Community Management",
    description: "Build and manage your communities",
    articles: 15,
    color: "bg-purple-600",
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    description: "Manage your subscription and payments",
    articles: 8,
    color: "bg-yellow-600",
  },
  {
    icon: Settings,
    title: "Account Settings",
    description: "Customize your account preferences",
    articles: 10,
    color: "bg-red-600",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Keep your account safe and secure",
    articles: 6,
    color: "bg-gray-600",
  },
]

const popularArticles = [
  {
    title: "How to create your first community",
    category: "Getting Started",
    readTime: "5 min read",
    views: "2.3k views",
  },
  {
    title: "Setting up live streaming",
    category: "Content Creation",
    readTime: "8 min read",
    views: "1.8k views",
  },
  {
    title: "Managing community rules and moderation",
    category: "Community Management",
    readTime: "6 min read",
    views: "1.5k views",
  },
  {
    title: "Understanding subscription plans",
    category: "Billing & Payments",
    readTime: "4 min read",
    views: "1.2k views",
  },
  {
    title: "Customizing your profile",
    category: "Account Settings",
    readTime: "3 min read",
    views: "980 views",
  },
]

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
      <Navigation />

      {/* Hero Section */}
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

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help articles, tutorials, and more..."
                className="pl-12 py-4 text-lg bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{action.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{action.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 bg-transparent"
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Browse Help Topics</h2>
            <p className="text-xl text-gray-300">Find detailed guides and tutorials organized by category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{category.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-red-600 text-white border-red-600">{category.articles} articles</Badge>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Articles</h2>
            <p className="text-xl text-gray-300">Most viewed help articles from our community</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {popularArticles.map((article, index) => (
              <Card
                key={index}
                className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Book className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-semibold hover:text-red-600 transition-colors text-white">
                          {article.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <Badge variant="outline" className="border-gray-700 text-gray-400">
                          {article.category}
                        </Badge>
                        <span>{article.readTime}</span>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              View All Articles
            </Button>
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
            <Card className="bg-gray-900 border-gray-800">
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

            <Card className="bg-gray-900 border-gray-800">
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

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Can I monetize my community?</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Yes! Xonnect offers multiple monetization options including paid memberships, premium content
                      tiers, virtual events, and direct fan support through tips and donations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
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

            <Card className="bg-gray-900 border-gray-800">
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
      <section className="py-20 bg-gray-900">
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

      <Footer />
    </div>
  )
}
