"use client"

import { AlertCircle, CheckCircle, XCircle, Info } from "lucide-react"

export default function GuidelinesPage() {
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
            Xonnect{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Guidelines</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70">
            Comprehensive guidelines for creators, viewers, and enterprise partners on the Xonnect platform
          </p>
        </div>
      </div>

      {/* Guidelines Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Creator Guidelines */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Creator Guidelines</h2>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Content Quality</h3>
                  <p className="text-white/70">
                    Maintain high-quality production standards. Use clear audio, good lighting, and stable video for
                    live streams and uploads. Ensure content is well-edited and provides value to your audience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Schedule Consistency</h3>
                  <p className="text-white/70">
                    Establish a consistent streaming or upload schedule. Inform your community about your schedule and
                    stick to it. Use the scheduling tools to notify followers of upcoming streams.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Engage Your Community</h3>
                  <p className="text-white/70">
                    Actively engage with your audience through chat, comments, and social media. Respond to feedback,
                    host Q&A sessions, and create a welcoming environment for fans.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Monetization Transparency</h3>
                  <p className="text-white/70">
                    Clearly disclose when content is sponsored, when donations are active, or when you're promoting
                    affiliate products. Be transparent about your revenue sources and commission structures.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Prohibited Creator Behavior</h3>
                  <ul className="text-white/70 space-y-2">
                    <li>• Misleading titles, thumbnails, or descriptions to gain views</li>
                    <li>• Sharing personal information of viewers without consent</li>
                    <li>• Promoting illegal activities or dangerous stunts</li>
                    <li>• Creating content that exploits or endangers others</li>
                    <li>• Plagiarizing content from other creators</li>
                    <li>• Using bot followers or artificial engagement tactics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Viewer Guidelines */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Viewer Guidelines</h2>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Respectful Interaction</h3>
                  <p className="text-white/70">
                    Treat creators and fellow viewers with respect. Keep chat clean and constructive. Use appropriate
                    language and avoid personal attacks or insults.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ticket & Purchase Terms</h3>
                  <p className="text-white/70">
                    Understand ticket terms before purchasing. Respect access restrictions based on ticket type. Don't
                    share or resell tickets without authorization. Report suspicious sellers to prevent fraud.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Community Participation</h3>
                  <p className="text-white/70">
                    Support creators through fair engagement. Leave honest reviews and ratings. Participate in community
                    activities and events. Help maintain a positive ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Prohibited Viewer Behavior</h3>
                  <ul className="text-white/70 space-y-2">
                    <li>• Harassment, bullying, or hate speech in chat</li>
                    <li>• Spam, self-promotion, or excessive advertising</li>
                    <li>• Sharing personal information of creators or other viewers</li>
                    <li>• Attempting to manipulate streams or engage in fraud</li>
                    <li>• Uploading copyrighted content without permission</li>
                    <li>• Creating fake accounts or engaging in vote manipulation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Streaming Guidelines */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Streaming Standards</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Technical Requirements</h3>
              </div>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>• Minimum bitrate: 2500 kbps (720p)</li>
                <li>• Recommended bitrate: 5000-8000 kbps (1080p)</li>
                <li>• Frame rate: 30fps minimum (60fps recommended)</li>
                <li>• Stable internet connection required</li>
                <li>• Professional equipment encouraged</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-white">Content Standards</h3>
              </div>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>• No hate speech or discrimination</li>
                <li>• No graphic violence or gore</li>
                <li>• No explicit sexual content</li>
                <li>• Age-appropriate for audience</li>
                <li>• Proper content warnings/labels</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Enterprise Partner Guidelines */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Enterprise Partnership Guidelines</h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Partnership Requirements</h3>
                  <p className="text-white/70 mb-4">
                    Enterprise partners must meet Xonnect's standards for professionalism, reliability, and ethical
                    conduct.
                  </p>
                  <ul className="text-white/70 space-y-2 ml-4">
                    <li>• Verified business registration and credentials</li>
                    <li>• Clear terms of service and privacy policy</li>
                    <li>• Dedicated support and communication channels</li>
                    <li>• Compliance with all platform policies</li>
                    <li>• Regular reporting and transparency</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Collaboration Best Practices</h3>
                  <p className="text-white/70 mb-4">
                    Enterprise partners should prioritize mutual growth and community benefit:
                  </p>
                  <ul className="text-white/70 space-y-2 ml-4">
                    <li>• Support creator growth and development</li>
                    <li>• Provide transparent commission and revenue sharing</li>
                    <li>• Respect intellectual property rights</li>
                    <li>• Maintain open communication with Xonnect</li>
                    <li>• Contribute to platform stability and security</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enforcement Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Enforcement & Violations</h2>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Violation Consequences</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-semibold">First Offense:</p>
                  <p className="text-white/70">Warning and content removal. Account may be temporarily restricted.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-semibold">Repeated Violations:</p>
                  <p className="text-white/70">7-30 day suspension. Loss of monetization privileges.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-semibold">Severe Violations:</p>
                  <p className="text-white/70">Permanent ban. Removal of all content. Legal action if necessary.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Support */}
        <section>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
            <p className="text-white/70 mb-6">
              Contact our support team or visit our help center for more information about guidelines and policies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                Contact Support
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20">
                Visit Help Center
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
