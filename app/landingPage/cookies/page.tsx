import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cookie, Settings, Eye, BarChart3, Target, Shield, ArrowRight } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Cookie{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Learn about how we use cookies and similar technologies to improve your experience on Xonnect and provide
              personalized services.
            </p>
            <p className="text-sm text-gray-500">Last updated: December 15, 2024</p>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Types of Cookies We Use</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We use different types of cookies to enhance your experience and provide our services effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Essential Cookies</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Required for basic website functionality, security, and user authentication.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong className="text-gray-300">Duration:</strong> Session/1 year
                  </p>
                  <p>
                    <strong className="text-gray-300">Can be disabled:</strong> No
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Analytics Cookies</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Help us understand how visitors use our website to improve performance and user experience.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong className="text-gray-300">Duration:</strong> 2 years
                  </p>
                  <p>
                    <strong className="text-gray-300">Can be disabled:</strong> Yes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Functional Cookies</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Remember your preferences and settings to provide a personalized experience.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong className="text-gray-300">Duration:</strong> 1 year
                  </p>
                  <p>
                    <strong className="text-gray-300">Can be disabled:</strong> Yes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Marketing Cookies</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Track your activity to show relevant advertisements and measure campaign effectiveness.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong className="text-gray-300">Duration:</strong> 1-2 years
                  </p>
                  <p>
                    <strong className="text-gray-300">Can be disabled:</strong> Yes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Social Media Cookies</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Enable social media features and track social media interactions.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong className="text-gray-300">Duration:</strong> 1 year
                  </p>
                  <p>
                    <strong className="text-gray-300">Can be disabled:</strong> Yes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Cookie className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Third-Party Cookies</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Set by external services we use, such as payment processors and analytics providers.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong className="text-gray-300">Duration:</strong> Varies
                  </p>
                  <p>
                    <strong className="text-gray-300">Can be disabled:</strong> Yes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cookie Details */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Are Cookies?</h2>
            <p className="text-xl text-gray-300">Understanding cookies and how they work</p>
          </div>

          <Card className="mb-8 bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Cookie Definition</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit a website. They contain
                information about your browsing activity and preferences, allowing websites to remember you and provide
                a better user experience.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain
                on your device for a set period or until manually deleted).
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">How We Use Cookies</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Authentication & Security</h4>
                  <p>Keep you logged in securely and protect against unauthorized access to your account.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Personalization</h4>
                  <p>Remember your preferences, language settings, and customize your experience on Xonnect.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Performance & Analytics</h4>
                  <p>Analyze how our website is used to identify areas for improvement and optimize performance.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Content Recommendations</h4>
                  <p>Suggest relevant communities, creators, and content based on your interests and activity.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Marketing & Advertising</h4>
                  <p>Show you relevant advertisements and measure the effectiveness of our marketing campaigns.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Managing Your Cookie Preferences</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Xonnect Cookie Settings</h4>
                  <p className="mb-4">You can manage your cookie preferences directly on our platform:</p>
                  <Button className="bg-red-600 hover:bg-red-700">
                    Manage Cookie Preferences
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cookie Preference Center */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Manage Your Cookie Preferences</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Take control of your privacy and customize your cookie settings to match your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-10 py-4 h-auto">
              Cookie Settings
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 h-auto border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Accept All Cookies
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
