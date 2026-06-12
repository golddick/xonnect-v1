'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cookie, Settings, Eye, BarChart3, Target, Shield, ArrowRight } from "lucide-react"

export default function CookiesPage() {
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
                    <Cookie className="w-4 h-4" />
                    <span>Cookie{" "}</span>
                  </div>
      
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-foreground via-muted-foreground to-red-400 bg-clip-text text-transparent">
                      Cookie Policy
                    </span>
                  </h1>
      
                   <p className="text-sm text-muted-foreground">Last updated: Febuary,  2025</p>
                </motion.div>
              </div>
            </section>


      {/* Cookie Details */}
      <section className="py-10 lg:py-20">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

       
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Are Cookies?</h2>
            <p className="text-xl text-muted-foreground">Understanding cookies and how they work</p>
          </div>

          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Cookie Definition</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit a website. They contain
                information about your browsing activity and preferences, allowing websites to remember you and provide
                a better user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain
                on your device for a set period or until manually deleted).
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">How We Use Cookies</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">Authentication & Security</h4>
                  <p>Keep you logged in securely and protect against unauthorized access to your account.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">Personalization</h4>
                  <p>Remember your preferences, language settings, and customize your experience on Xonnect.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">Performance & Analytics</h4>
                  <p>Analyze how our website is used to identify areas for improvement and optimize performance.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">Content Recommendations</h4>
                  <p>Suggest relevant communities, creators, and content based on your interests and activity.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">Marketing & Advertising</h4>
                  <p>Show you relevant advertisements and measure the effectiveness of our marketing campaigns.</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </motion.div>
      </section>


    </div>
  )
}
