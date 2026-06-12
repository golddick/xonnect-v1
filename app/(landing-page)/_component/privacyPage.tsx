"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react"

export default function PrivacyPage() {
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
              <Shield className="w-4 h-4" />
              <span>Xonnect Privacy</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>

            <p className="text-sm text-muted-foreground">Last updated: Febuary,  2025</p>
          </motion.div>
        </div>
      </section>



      {/* Privacy Principles */}
{/*      <section className="py-10 lg:py-20 ">*/}
{/*        <div className="max-w-7xl mx-auto px-6 md:px-8">*/}
{/*         <motion.div*/}
{/*            initial={{ opacity: 0, y: 30 }}*/}
{/*            whileInView={{ opacity: 1, y: 0 }}*/}
{/*            transition={{ duration: 0.8 }}*/}
{/*            viewport={{ once: true }}*/}
{/*            className="text-center mb-16"*/}
{/*          >*/}

{/*          <div className="text-center mb-16">*/}
{/*            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Privacy Principles</h2>*/}
{/*            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">*/}
{/*              We believe in transparency, user control, and data protection by design*/}
{/*            </p>*/}
{/*          </div>*/}

{/*          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
{/*<Card className="bg-card border-border hover:border-red-600 transition-all duration-300 group text-center">*/}
{/*              <CardContent className="p-8">*/}
{/*                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">*/}
{/*                  <Eye className="w-8 h-8 text-white" />*/}
{/*                </div>*/}
{/*                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Transparency</h3>*/}
{/*                <p className="text-muted-foreground leading-relaxed">*/}
{/*                  We're clear about what data we collect and how we use it. No hidden practices or unclear terms.*/}
{/*                </p>*/}
{/*              </CardContent>*/}
{/*            </Card>*/}

{/*<Card className="bg-card border-border hover:border-red-600 transition-all duration-300 group text-center">*/}
{/*              <CardContent className="p-8">*/}
{/*                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">*/}
{/*                  <Lock className="w-8 h-8 text-white" />*/}
{/*                </div>*/}
{/*                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Security</h3>*/}
{/*                <p className="text-muted-foreground leading-relaxed">*/}
{/*                  Your data is protected with industry-leading security measures and encryption protocols.*/}
{/*                </p>*/}
{/*              </CardContent>*/}
{/*            </Card>*/}

{/*<Card className="bg-card border-border hover:border-red-600 transition-all duration-300 group text-center">*/}
{/*              <CardContent className="p-8">*/}
{/*                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">*/}
{/*                  <Users className="w-8 h-8 text-white" />*/}
{/*                </div>*/}
{/*                <h3 className="text-xl font-semibold mb-4 text-card-foreground">User Control</h3>*/}
{/*                <p className="text-muted-foreground leading-relaxed">*/}
{/*                  You have full control over your data, including the ability to access, modify, or delete it.*/}
{/*                </p>*/}
{/*              </CardContent>*/}
{/*            </Card>*/}
{/*          </div>*/}
{/*        </motion.div>*/}
{/*        </div>*/}
{/*      </section>*/}

      {/* Privacy Policy Content */}
      <section className="py-10 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
              <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

         
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8 bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                  <Database className="w-6 h-6 text-red-600" />
                  Information We Collect
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Account Information</h3>
                    <p>
                      When you create an account, we collect your name, email address, username, and profile information
                      you choose to provide.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Content and Communications</h3>
                    <p>
                      We collect the content you create, share, and communicate through our platform, including posts,
                      messages, comments, and media files.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Usage Information</h3>
                    <p>
                      We automatically collect information about how you use our services, including your interactions,
                      preferences, and technical data like IP address and device information.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Payment Information</h3>
                    <p>
                      For paid services, we collect billing information through secure third-party payment processors.
                      We don't store your full payment card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                  <Globe className="w-6 h-6 text-red-600" />
                  How We Use Your Information
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Provide Our Services</h3>
                    <p>
                      We use your information to operate, maintain, and improve Xonnect's features and functionality.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Personalization</h3>
                    <p>
                      We personalize your experience by showing relevant content, communities, and recommendations based
                      on your interests and activity.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Communication</h3>
                    <p>
                      We use your contact information to send important updates, notifications, and respond to your
                      inquiries.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Safety and Security</h3>
                    <p>
                      We use your information to protect our platform, prevent abuse, and ensure the safety of our
                      community.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Analytics and Improvement</h3>
                    <p>We analyze usage patterns to understand how our services are used and to make improvements.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-white/5 border-white/10 ">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Information Sharing</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We don't sell your personal information. We may share your information in these limited
                    circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">With your consent:</strong> When you explicitly agree to share
                      information with third parties.
                    </li>
                    <li>
                      <strong className="text-white">Service providers:</strong> With trusted partners who help us
                      operate our services, under strict confidentiality agreements.
                    </li>
                    <li>
                      <strong className="text-white">Legal requirements:</strong> When required by law, court order, or
                      to protect rights and safety.
                    </li>
                    <li>
                      <strong className="text-white">Business transfers:</strong> In connection with mergers,
                      acquisitions, or asset sales, with appropriate protections.
                    </li>
                    <li>
                      <strong className="text-white">Public content:</strong> Content you choose to make public is
                      visible to other users and may be indexed by search engines.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Data Security</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We implement comprehensive security measures to protect your information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>End-to-end encryption for sensitive communications</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Secure data centers with physical and digital access controls</li>
                    <li>Employee training on data protection and privacy</li>
                    <li>Incident response procedures for potential security breaches</li>
                  </ul>
                  <p className="mt-4">
                    While we use industry-standard security measures, no system is 100% secure. We encourage you to use
                    strong passwords and enable two-factor authentication.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Your Rights and Choices</h2>
                <div className="space-y-4 text-gray-300">
                  <p>You have several rights regarding your personal information:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-white">Access and Portability</h3>
                      <p className="text-sm">Request a copy of your personal data in a portable format.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-white">Correction</h3>
                      <p className="text-sm">Update or correct inaccurate personal information.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-white">Deletion</h3>
                      <p className="text-sm">Request deletion of your personal data, subject to legal requirements.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-white">Restriction</h3>
                      <p className="text-sm">Limit how we process your personal information.</p>
                    </div>
                  </div>
                  <p className="mt-4">
                    To exercise these rights, contact us at hrxonnet@gmail.com. We'll respond within 30 days.
                  </p>
                </div>
              </CardContent>
            </Card>

<Card className="mb-8 bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>If you have questions about this privacy policy or our data practices, please contact us:</p>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <p>
                      <strong className="text-foreground">Email:</strong> hrxonnet@gmail.com
                    </p>
                    <p>
                      <strong className="text-white">Address:</strong> Xonnect Privacy Team
                      <br />
                      Nigeria
                    </p>
                    <p>
                      <strong className="text-white">Data Protection Officer:</strong> hrxonnect@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
           </motion.div>
        </div>
      </section>
    </div>
  )
}
