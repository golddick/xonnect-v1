import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Users, Zap, BarChart3, Headphones, Globe, ArrowRight } from "lucide-react"

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white border-red-600">Enterprise Solution</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Scale Your Organization with{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Xonnect Enterprise
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Empower your team with advanced collaboration tools, enterprise-grade security, and dedicated support.
              Built for organizations that demand the best.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-10 py-4 h-auto">
                Contact Sales
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-4 h-auto border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Enterprise Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage large-scale content creation and collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Advanced Security</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Enterprise-grade security with SSO, 2FA, and compliance certifications including SOC 2 and GDPR.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Single Sign-On (SSO)
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Advanced user permissions
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Audit logs & compliance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Team Management</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Comprehensive tools to manage large teams with role-based access and organizational hierarchy.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Unlimited team members
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Custom roles & permissions
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Department organization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Advanced Analytics</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Deep insights into content performance, team productivity, and audience engagement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Custom dashboards
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Advanced reporting
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Data export & API access
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Priority Support</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Dedicated support team with guaranteed response times and direct access to our experts.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    24/7 priority support
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Custom onboarding
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Global Infrastructure</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Worldwide content delivery network ensuring fast, reliable access for your global team.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Global CDN
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    99.9% uptime SLA
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Regional data centers
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Custom Integrations</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Seamlessly integrate with your existing tools and workflows through our robust API.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    REST & GraphQL APIs
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Webhook support
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-red-500" />
                    Custom development
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Enterprise Pricing</h2>
            <p className="text-xl text-gray-300">Flexible pricing that scales with your organization</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-red-600 border-2">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl font-bold mb-6 text-white">Custom Enterprise Plan</h3>
                <p className="text-xl text-gray-300 mb-12">Tailored solutions for your organization's unique needs</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h4 className="text-xl font-semibold mb-6 text-white">What's Included:</h4>
                    <ul className="space-y-4 text-left">
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">Unlimited users and communities</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">Advanced security & compliance</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">Priority support & training</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">Custom integrations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-6 text-white">Enterprise Benefits:</h4>
                    <ul className="space-y-4 text-left">
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">Dedicated account manager</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">Custom onboarding program</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">SLA guarantees</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-6 h-6 text-red-500" />
                        <span className="text-gray-300">White-label options</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-12 py-4 h-auto">
                  Contact Sales for Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Organization?</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join leading companies that trust Xonnect Enterprise for their content collaboration needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-10 py-4 h-auto">
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 h-auto border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
