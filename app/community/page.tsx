"use client"

import { Heart, Users, Shield, MessageCircle, TrendingUp, Award } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Xonnect</span>{" "}
            Community
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8">
            Be part of a vibrant community of creators, viewers, and innovators reshaping digital entertainment
          </p>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Community Standards</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Respect & Inclusion */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Respect & Inclusion</h3>
                <ul className="space-y-3 text-white/70">
                  <li>✓ Treat all community members with dignity and respect</li>
                  <li>✓ Celebrate diversity across cultures, backgrounds, and identities</li>
                  <li>✓ Zero tolerance for discrimination, harassment, or hate speech</li>
                  <li>✓ Support a welcoming environment for creators and viewers</li>
                  <li>✓ Challenge prejudice and stand up against bullying</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Safety First */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Safety First</h3>
                <ul className="space-y-3 text-white/70">
                  <li>✓ Protect user privacy and personal information</li>
                  <li>✓ No sharing of private conversations or contact details</li>
                  <li>✓ Report suspicious activity and potential scams immediately</li>
                  <li>✓ Keep accounts secure with strong passwords</li>
                  <li>✓ Be cautious with personal information online</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Authentic Content */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Authentic Content</h3>
                <ul className="space-y-3 text-white/70">
                  <li>✓ Create genuine, original content</li>
                  <li>✓ Be transparent about sponsorships and partnerships</li>
                  <li>✓ No deceptive practices or misleading claims</li>
                  <li>✓ Respect intellectual property and give proper credits</li>
                  <li>✓ Disclose conflicts of interest when necessary</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Positive Engagement */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all">
            <div className="flex items-start gap-4">
              <MessageCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Positive Engagement</h3>
                <ul className="space-y-3 text-white/70">
                  <li>✓ Engage constructively in conversations</li>
                  <li>✓ Respect different opinions and viewpoints</li>
                  <li>✓ No spam, excessive self-promotion, or flooding</li>
                  <li>✓ Provide helpful feedback and support others</li>
                  <li>✓ Keep discussions on-topic and appropriate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Content Moderation */}
        <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl p-8 sm:p-12 mb-16">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Content Moderation</h3>
              <p className="text-white/70 mb-4">
                Xonnect maintains strict content moderation policies to ensure a safe and respectful environment. Our
                moderation team reviews reported content and takes appropriate action based on community guidelines.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">Prohibited Content:</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Hate speech and discrimination</li>
                    <li>• Graphic violence or gore</li>
                    <li>• Explicit sexual content</li>
                    <li>• Child safety violations</li>
                    <li>• Illegal activities</li>
                  </ul>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">Enforcement Actions:</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Content warnings and removals</li>
                    <li>• Account suspension</li>
                    <li>• Creator privileges removal</li>
                    <li>• Permanent bans for severe violations</li>
                    <li>• Law enforcement cooperation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Support */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12">
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Support</h3>
              <p className="text-white/70 mb-6">
                Our community team is dedicated to supporting members and maintaining a positive environment. If you
                experience harassment, witness violations, or need assistance:
              </p>
              <div className="space-y-3 text-white/70">
                <p>
                  <strong className="text-white">Report Content:</strong> Use the report button on any post or stream to
                  flag inappropriate content.
                </p>
                <p>
                  <strong className="text-white">Contact Support:</strong> Email support@xonnect.com with details of any
                  issues or concerns.
                </p>
                <p>
                  <strong className="text-white">Community Resources:</strong> Visit our help center for guidelines,
                  FAQs, and best practices.
                </p>
                <p>
                  <strong className="text-white">Feedback:</strong> Share suggestions for improving community safety and
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="border-t border-white/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Community by the Numbers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                500K+
              </p>
              <p className="text-white/70">Active Creators</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                10M+
              </p>
              <p className="text-white/70">Community Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                1B+
              </p>
              <p className="text-white/70">Monthly Views</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                150+
              </p>
              <p className="text-white/70">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
