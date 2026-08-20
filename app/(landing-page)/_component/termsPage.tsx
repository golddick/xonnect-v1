"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}

        <section className="relative pt-32 pb-8 px-6 md:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/30 text-red-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm mb-8">
              <Scale className="w-4 h-4" />
              <span>Xonnect Terms</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-foreground bg-clip-text ">
              Terms of Service
              </span>
            </h1>

              <p className="text-sm text-muted-foreground">Last updated: Febuary,  2025 (under review)</p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-10 lg:py-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 w-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-card-foreground">
                  <FileText className="w-6 h-6 text-red-600" />
                  Agreement to Terms
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing or using Xonnect ("the Service"), you agree to be bound by these Terms of Service
                    ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, and others who access or use the Service, including
                    creators, community members, and enterprise customers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 w-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4 text-card-foreground">
                  Description of Service
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Xonnect is an event streaming platform that enables creators to build, manage, and monetize online communities. Our
                    services include:
                  </p>
                  <div className="space-y-1">
                    <p>Community creation and management tools</p>
                    <p>Content creation and sharing features</p>
                    <p>Live streaming and video hosting</p>
                    <p>Monetization and payment processing</p>
                    <p>Analytics and insights</p>
                    <p>Communication and collaboration tools</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 w-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4 text-foreground">User Accounts</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Account Creation</h3>
                    <p>To use certain features of the Service, you must create an account. You agree to:</p>
                    <div className="space-y-1 mt-2">
                      <p>Provide accurate, current, and complete information</p>
                      <p>Maintain and update your account information</p>
                      <p>Keep your password secure and confidential</p>
                      <p>Accept responsibility for all activities under your account</p>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Acceptable Use</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    You agree to use the Service responsibly and in compliance with all applicable laws. You may not:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-red-600">Prohibited Content</h3>
                      <div className="text-sm space-y-1">
                        <p>Illegal or harmful content</p>
                        <p>Harassment or hate speech</p>
                        <p>Spam or misleading information</p>
                        <p>Adult content (outside designated areas)</p>
                        <p>Copyrighted material without permission</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-red-600">Prohibited Activities</h3>
                      <div className="text-sm space-y-1">
                        <p>Impersonating others</p>
                        <p>Hacking or system interference</p>
                        <p>Automated data collection</p>
                        <p>Circumventing security measures</p>
                        <p>Commercial use without permission</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 flex flex-col items-center justify-centerw-full">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Content and Intellectual Property</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Your Content</h3>
                    <p>
                      You retain ownership of content you create and share on Xonnect. By posting content, you grant us
                      a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on
                      the platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Our Content</h3>
                    <p>
                      The Service and its original content, features, and functionality are owned by Xonnect and are
                      protected by international copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Copyright Policy</h3>
                    <p>
                      We respect intellectual property rights and respond to valid copyright infringement notices.
                      Repeat infringers may have their accounts terminated.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 flex flex-col items-center justify-center w-full ">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Payment Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Pay on Demand </h3>
                    <p>
                      Fans pay only for the content they want no subscription required. 
                      All payments are non-refundable unless required by law or stated in our refund policy.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Creator Monetization</h3>
                    <p>
                      Creators can monetize their content through various means. We charge a platform fee for processing
                      payments and providing monetization tools. Specific rates are outlined in your creator agreement.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Taxes</h3>
                    <p>
                      You are responsible for any applicable taxes related to your use of paid services or earnings from
                      the platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-card-foreground">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  Disclaimers and Limitations
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Service Availability</h3>
                    <p>
                      We strive to maintain high availability but cannot guarantee uninterrupted service. The Service is
                      provided "as is" without warranties of any kind.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">User Generated Content</h3>
                    <p>
                      We are not responsible for user generated content and do not endorse any opinions expressed by
                      users. Users are solely responsible for their content and interactions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Third-Party Services</h3>
                    <p>
                      Our Service may contain links to third-party websites or services. We are not responsible for the
                      content or practices of these third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Termination</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">By You</h3>
                    <p>
                      You may terminate your account at any time by contacting us or using the account deletion feature
                      in your settings.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">By Us</h3>
                    <p>
                      We may terminate or suspend your account immediately if you violate these Terms or for any other
                      reason at our sole discretion, with or without notice.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Effect of Termination</h3>
                    <p>
                      Upon termination, your right to use the Service ceases immediately. We may delete your account and
                      content, though some information may be retained as required by law.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-card-foreground">
                  <Shield className="w-6 h-6 text-red-600" />
                  Contact Information
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>If you have questions about these Terms, please contact us:</p>
                  <div className="bg-muted p-4 rounded-lg border border-gray-800">
                    <p>
                      <strong className="text-foreground">Email:</strong> hrxonnet@gmail.com
                    </p>
                    <p>
                      <strong className="text-foreground">Address:</strong>Nigeria
                    </p>
                    <p>
                      <strong className="text-foreground">Phone:</strong> +2347050998742
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </motion.div>
      </section>

    </div>
  )
}