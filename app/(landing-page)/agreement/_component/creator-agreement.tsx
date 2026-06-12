"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Calendar,
  Shield,
  Users,
  Video,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "../../../../components/navigation"
import Footer from "../../../../components/footer"
import HeroSection2 from "@/app/(landing-page)/_component/heroSection";

const CreatorAgreement = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToContent, setAgreedToContent] = useState(false)
  const [agreedToSupport, setAgreedToSupport] = useState(false)
  const [signature, setSignature] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms || !agreedToContent || !agreedToSupport || !signature) {
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/creator-agreement/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accepted: true, signature }),
      })

      if (!res.ok) {
        return
      }

      window.location.href = "/creator/dashboard"
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = agreedToTerms && agreedToContent && agreedToSupport && signature.trim()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative z-10 ">
        <HeroSection2
            title={" Creator Agreement"}
            ICON={<FileText className="w-4 h-4" />}
            iconTitle="Creator Agreement"
        />
      </div>
      {/*<section className="pt-32 pb-16 px-6 md:px-8 bg-gradient-to-b from-red-900/50 to-background">*/}
      {/*  <div className="max-w-4xl mx-auto text-center">*/}
      {/*    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>*/}
      {/*      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">*/}
      {/*        <FileText className="w-8 h-8 text-white" />*/}
      {/*      </div>*/}
      {/*      <h1 className="text-4xl md:text-5xl font-bold mb-6">*/}
      {/*        Creator <span className="text-red-500">Agreement</span>*/}
      {/*      </h1>*/}
      {/*      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">*/}
      {/*        Join the Xonnect Creator Community and start building your audience today. We're here to support your*/}
      {/*        success every step of the way.*/}
      {/*      </p>*/}
      {/*    </motion.div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Agreement Content */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Creator Support & Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-card border border-border rounded-2xl text-card-foreground hover:bg-accent transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                    Creator Benefits & Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-transparent p-4 rounded-lg border border-red-500/20 space-y-2">
                      <div className="flex items-center space-x-2 text-red-400 font-semibold">
                        <TrendingUp className="w-5 h-5" />
                        <span>Growth Tools</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Analytics dashboard, audience insights, and growth recommendations
                      </p>
                    </div>
                    <div className="bg-transparent p-4 rounded-lg border border-green-500/20 space-y-2">
                      <div className="flex items-center space-x-2 text-green-400 font-semibold">
                        <Users className="w-5 h-5" />
                        <span>Community Building</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Subscriber features, community posts, and engagement tools
                      </p>
                    </div>
                    <div className="bg-transparent p-4 rounded-lg border border-purple-500/20 space-y-2">
                      <div className="flex items-center space-x-2 text-purple-400 font-semibold">
                        <Shield className="w-5 h-5" />
                        <span>Creator Support</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Dedicated support team, creator resources, and onboarding help
                      </p>
                    </div>
                    <div className="bg-transparent p-4 rounded-lg border border-yellow-500/20 space-y-2">
                      <div className="flex items-center space-x-2 text-yellow-400 font-semibold">
                        <Video className="w-5 h-5" />
                        <span>Monetization Tools</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Subscriptions, tips, premium content, and merchandise integration
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="support-agreement"
                      checked={agreedToSupport}
                      onCheckedChange={(checked) => setAgreedToSupport(checked as boolean)}
                    />
                    <label htmlFor="support-agreement" className="text-sm">
                      I understand the creator benefits and support available on Xonnect
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-card border border-border rounded-2xl hover:bg-accent transition-all duration-300 text-card-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Shield className="w-6 h-6 mr-3 text-red-400" />
                    Content Guidelines & Community Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-transparent p-4 rounded-lg text-center">
                      <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h5 className="font-semibold mb-1">Quality Content</h5>
                      <p className="text-xs text-gray-400">Maintain high-quality, engaging content for your audience</p>
                    </div>
                    <div className="bg-transparent p-4 rounded-lg text-center">
                      <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h5 className="font-semibold mb-1">Community First</h5>
                      <p className="text-xs text-gray-400">Foster positive, inclusive community interactions</p>
                    </div>
                    <div className="bg-transparent p-4 rounded-lg text-center">
                      <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h5 className="font-semibold mb-1">Follow Guidelines</h5>
                      <p className="text-xs text-gray-400">Adhere to platform community standards and policies</p>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded-lg">
                    <h5 className="font-semibold mb-3">Content Standards:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h6 className="text-green-400 font-medium mb-2">✓ Allowed Content</h6>
                        <ul className="text-gray-400 space-y-1">
                          <li>• Educational and entertainment content</li>
                          <li>• Gaming, music, art, and creative content</li>
                          <li>• Live streaming and interactive sessions</li>
                          <li>• Community discussions and Q&As</li>
                          <li>• Behind-the-scenes and personal vlogs</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-red-400 font-medium mb-2">✗ Prohibited Content</h6>
                        <ul className="text-gray-400 space-y-1">
                          <li>• Hate speech or discriminatory content</li>
                          <li>• Violence, harassment, or bullying</li>
                          <li>• Copyright infringement</li>
                          <li>• Spam or misleading information</li>
                          <li>• Adult content (18+ restrictions apply)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="content-agreement"
                      checked={agreedToContent}
                      onCheckedChange={(checked) => setAgreedToContent(checked as boolean)}
                    />
                    <label htmlFor="content-agreement" className="text-sm">
                      I agree to follow all content guidelines and community standards
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-card border border-border rounded-2xl hover:bg-accent transition-all duration-300 text-card-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="w-6 h-6 mr-3 text-red-400" />
                    Terms and Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted border border-border p-4 rounded-lg max-h-64 hidden-scrollbar overflow-y-auto">
                    <div className="text-sm text-muted-foreground space-y-3">
                      <h5 className="font-semibold text-foreground">1. Creator Responsibilities</h5>
                      <p>
                        As a Xonnect creator, you agree to maintain regular content creation, engage with your
                        community, and uphold platform standards. You are responsible for the originality and legality
                        of your content.
                      </p>

                      <h5 className="font-semibold text-foreground">2. Monetization</h5>
                      <p>
                        Xonnect offers multiple monetization options including subscriptions, premium content, and
                        merchandise. We handle payment processing and provide transparent analytics so you know exactly
                        how your community is supporting you.
                      </p>

                      <h5 className="font-semibold text-white">3. Intellectual Property</h5>
                      <p>
                        You retain full ownership of your original content. By uploading to Xonnect, you grant us a
                        license to host, distribute, and promote your content on our platform only.
                      </p>

                      <h5 className="font-semibold text-foreground">4. Creator Rights</h5>
                      <p>
                        We respect your rights as a creator. You can download your data, export your audience, and move
                        your content at any time. We're committed to creator-first policies.
                      </p>

                      <h5 className="font-semibold text-white">5. Account Termination</h5>
                      <p>
                        Either party may terminate this agreement with notice. Violations of community guidelines may
                        result in suspension. We'll always give you the opportunity to address concerns before taking
                        action.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms-agreement"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <label htmlFor="terms-agreement" className="text-sm">
                        I have read and agree to the terms and conditions
                      </label>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Digital Signature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-card border border-border rounded-2xl hover:bg-accent transition-all duration-300 text-card-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                    Digital Signature
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="signature" className="block text-sm font-medium mb-2">
                      Type your full name to digitally sign this agreement
                    </label>
                    <Textarea
                      id="signature"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Enter your full legal name here..."
                      className=" border-gray-700 text-foreground "
                      rows={2}
                    />
                  </div>

                  <div className=" border border-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Date: {new Date().toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      By typing your name above, you acknowledge that this constitutes a legal digital signature and you
                      agree to be bound by this creator agreement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-12 py-4 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Agreement...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Accept Agreement & Become Creator
                  </>
                )}
              </Button>

              {!canSubmit && (
                <p className="text-sm text-gray-400 mt-4">Please review and accept all sections above to continue</p>
              )}
            </motion.div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CreatorAgreement
