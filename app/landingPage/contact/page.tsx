import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones, Users, ArrowRight } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Get in{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Have questions about Xonnect? Want to partner with us? We'd love to hear from you. Our team is here to
              help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">General Inquiries</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Questions about our platform, features, or getting started
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-red-500" />
                    hello@xonnect.com
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    Response within 24 hours
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Technical Support</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Need help with your account, billing, or technical issues
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-red-500" />
                    support@xonnect.com
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    24/7 support available
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Enterprise Sales</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Interested in enterprise solutions or custom partnerships
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-red-500" />
                    sales@xonnect.com
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-red-500" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-black border-gray-800">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-8 text-white">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
                      <Input
                        placeholder="John"
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Company (Optional)</label>
                    <Input
                      placeholder="Your Company"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                    <Input
                      placeholder="How can we help you?"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-black border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-white">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <p className="text-gray-400">hello@xonnect.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Phone</p>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Address</p>
                        <p className="text-gray-400">
                          123 Innovation Drive
                          <br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Business Hours</p>
                        <p className="text-gray-400">
                          Monday - Friday: 9:00 AM - 6:00 PM PST
                          <br />
                          Weekend: Emergency support only
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-white">Office Location</h3>
                  <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center mb-4">
                    <p className="text-gray-500">Interactive Map Coming Soon</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Located in the heart of San Francisco's tech district, our office is easily accessible by public
                    transportation and offers visitor parking.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of creators who are already building amazing communities with Xonnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-10 py-4 h-auto">
              Start Free Trial
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
      </section>

      <Footer />
    </div>
  )
}
