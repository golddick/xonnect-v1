"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Tv, DollarSign, Globe } from "lucide-react"
import Link from "next/link"
import XonnectHero from "./_component/XonnectHero"
import LiveNow from "./_component/LiveNow"
import WhyJoin from "./_component/WhyJoin"

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const stats = [
  { icon: Users, value: "20K+", label: "Active Viewers" },
  { icon: Tv, value: "8K+", label: "Live Streams Hosted" },
  { icon: DollarSign, value: "$1M+", label: "Paid Out to Creators" },
  { icon: Globe, value: "60+", label: "Countries Reached" },
]

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What is Xonnect?",
    a: "Xonnect is a live streaming and on-demand content platform that connects creators and viewers worldwide. Unlike traditional platforms, Xonnect uses a pay-on-demand model viewers pay only for the specific streams or events they want to watch. Think of it as your front-row seat to the world's most exciting live events, masterclasses, concerts, gaming tournaments, and more.",
  },
  {
    q: "How does the pay-on-demand model work?",
    a: "It's simple: creators set a price for their stream or event, and viewers pay a one-time fee to access it. There are no mandatory monthly subscriptions. Once you pay, you get live access plus replay access for a set period. You only spend money on content you actually want nothing more.",
  },
  {
    q: "Is Xonnect free to join?",
    a: "Yes! Creating an account on Xonnect is completely free for both viewers and creators. Viewers can browse all content for free and only pay when they choose to unlock a specific stream. Creators can sign up, set up their profile, and start streaming without any upfront cost.",
  },
  {
    q: "How do creators get paid on Xonnect?",
    a: "Creators earn directly from their streams. When a viewer pays to watch your content, you receive vast majority of the revenue one of the highest creator payouts in the industry. Payouts are processed securely and can be withdrawn to your bank account or mobile money wallet. You can track all your earnings in real time through your creator dashboard.",
  },
  {
    q: "What kind of content can I find on Xonnect?",
    a: "Xonnect hosts a wide range of content including live music concerts, esports tournaments, tech conferences, fitness classes, cooking masterclasses, fashion shows, educational workshops, comedy shows, and community events. Whether you're a fan, a learner, or a professional, there's something for you.",
  },
  {
    q: "Can I watch on my TV, phone, or laptop?",
    a: "Absolutely. Xonnect is designed to work seamlessly across all your devices smart TVs, laptops, tablets, and smartphones. Your experience is optimized for each screen size so you never miss a moment, whether you're at home or on the go.",
  },
  {
    q: "How do I start streaming as a creator?",
    a: "Getting started is easy. Sign up for a free creator account, complete your profile, and you can go live in minutes. All you need is a device with a camera and a stable internet connection. For higher-quality productions, we recommend a dedicated webcam, microphone, and at least 5 Mbps upload speed. Our tutorials section walks you through everything step by step.",
  },
  {
    q: "Are my payments and personal data safe on Xonnect?",
    a: "Yes. Xonnect uses industry-standard encryption for all transactions and personal data. We never store your full card details, and all payments are processed through secure, certified payment gateways. You are always in control of your data and can request deletion at any time in accordance with our Privacy Policy.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* 1. Full-screen Netflix-style Hero */}
      <XonnectHero />

      {/* 2. Stats Bar */}
      <section className="relative z-10  bg-card/50 backdrop-blur-sm py-6 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center px-4"
              >
                <stat.icon className="w-5 h-5 text-red-500 mb-2" />
                <span className="text-2xl sm:text-3xl font-black text-foreground">{stat.value}</span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Live Now / Trending Now */}
      <LiveNow />

      {/* 4. Feature Highlight — split layout */}
      <section className="relative z-10 py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-red-600/10 rounded-3xl blur-2xl" />
              <img
                src="/futuristic-creator-workspace-with-charts-and-analy.png"
                alt="Creator workspace"
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover"
              />
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 z-20 bg-card border border-border rounded-xl px-5 py-4 shadow-xl"
              >
                <p className="text-xs text-muted-foreground mb-1">This month's earnings</p>
                <p className="text-2xl font-black text-foreground">$4,820</p>
                <p className="text-xs text-red-500 font-semibold mt-1">↑ 34% from last month</p>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <Badge variant="destructive">For Creators</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
                Your Content.<br />Your Price.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Xonnect puts you in the driver's seat. Set your own prices, go live instantly, and build a community that pays you directly.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time analytics & audience insights",
                  "Free & paid content you decide",
                  "Built-in community & fan engagement tools",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-red-600/15 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 gap-2 mt-2">
                  Start Creating <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Viewer Feature — reversed */}
      <section className="relative z-10 py-20 px-4 sm:px-6 md:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <Badge variant="destructive">For Viewers</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
                Watch What<br />You Love.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                No subscription traps. Browse thousands of live events and on-demand streams for free. Only pay when you find something you truly want to experience on any screen, anywhere.
              </p>
              <ul className="space-y-3">
                {[
                  "Pay-per-stream no monthly fees",
                  "HD streaming on TV, laptop & mobile",
                  "Live chat, polls & creator Q&As",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-red-600/15 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/tv">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 gap-2 mt-2">
                  Explore Content <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-1 lg:order-2"
            >
              <div className="absolute -inset-4 bg-red-600/10 rounded-3xl blur-2xl" />
              <div className="relative z-10 grid grid-cols-2 gap-3">
                <img src="/vibrant-concert.png" alt="Concert" className="rounded-xl shadow-lg w-full object-cover aspect-square" />
                <img src="/gaming-tournament.png" alt="Gaming" className="rounded-xl shadow-lg w-full object-cover aspect-square mt-6" />
                <img src="/cooking-show.jpg" alt="Cooking" className="rounded-xl shadow-lg w-full object-cover aspect-square -mt-6" />
                <img src="/tech-conference.jpg" alt="Tech" className="rounded-xl shadow-lg w-full object-cover aspect-square" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Why Join — covers both user types */}
      <WhyJoin />

      {/* 7. FAQ */}
      <section className="relative z-10 py-20 px-4 sm:px-6 md:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="destructive" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">
              What's Xonnect?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about the platform answered clearly and honestly.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 text-left font-semibold text-foreground hover:no-underline hover:text-red-500 transition-colors text-sm sm:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 8. Final CTA Banner */}
      <section className="relative z-10 py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="destructive" className="mb-6">Join Xonnect Today</Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              Ready to Connect<br />with the World?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Whether you're here to create, watch, or both — Xonnect is your stage. Join thousands already streaming, earning, and connecting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 gap-2">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tv">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted font-semibold px-10">
                  Browse Content
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
