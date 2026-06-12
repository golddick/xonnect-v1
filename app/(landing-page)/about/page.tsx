"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Heart, Shield, Globe, Zap, Users, Tv, Eye, Target, Award, ArrowRight,
  Play, TrendingUp, DollarSign, Star, ShieldQuestion
} from "lucide-react"
import Link from "next/link"
import HeroSection2 from "@/app/(landing-page)/_component/heroSection";

// ─── Team ─────────────────────────────────────────────────────────────────────
const team = [
  { name: "Kofi Mensah", role: "CEO & Co-Founder", avatar: "KM", bio: "Former broadcast engineer turned entrepreneur. Built Xonnect to solve the access problem he faced as a fan." },
  { name: "Amara Osei", role: "CTO & Co-Founder", avatar: "AO", bio: "10+ years in streaming infrastructure. Obsessed with low-latency, high-quality live video at scale." },
  { name: "Zara Diallo", role: "Head of Creator Success", avatar: "ZD", bio: "Ex-YouTube creator with 2M+ subscribers. Knows exactly what creators need to thrive." },
  { name: "David Nkosi", role: "Head of Product", avatar: "DN", bio: "Product veteran from fintech and media. Designs experiences that feel effortless." },
]

// ─── Values ───────────────────────────────────────────────────────────────────
const values = [
  { icon: Heart, title: "Creator First", desc: "Every feature we build starts with one question: does this help creators earn more and reach further?" },
  { icon: Eye, title: "Radical Access", desc: "Geography should never be a barrier. We believe every fan deserves a front-row seat, anywhere on earth." },
  { icon: Shield, title: "Trust & Safety", desc: "Secure payments, encrypted streams, and transparent policies — because trust is the foundation of everything." },
  { icon: Zap, title: "Real-Time Magic", desc: "We obsess over latency, quality, and reliability so that live truly feels live — not a replay." },
  { icon: Globe, title: "Global Community", desc: "120K+ viewers across 60+ countries. We celebrate diversity and build bridges between cultures." },
  { icon: DollarSign, title: "Fair Economics", desc: "Creators keep up to 70% of every sale. We grow when you grow — that's the only model that makes sense." },
]

// ─── Milestones ───────────────────────────────────────────────────────────────
const milestones = [
  { year: "2022", title: "The Idea", desc: "Founders missed a sold-out concerts and asked: why can't the world watch this live?" },
  { year: "2025", title: "First Build", desc: "Beta launched at a fola event in ui Hosted by GTB." },
  { year: "2026", title: "Growth", desc: "Crossed 50K active users, $500K paid out to creators, expanded to 30 countries." }
]

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "20K+", label: "Active Viewers" },
  { value: "$1M+", label: "Paid to Creators" },
  { value: "8K+", label: "Streams Hosted" },
  { value: "60+", label: "Countries" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Hero ── */}

      <HeroSection2
          title="  Built for the Ones Left Outside."
          ICON={<ShieldQuestion className="w-5 h-5 text-red-400" />}
          iconTitle="Our Story "
      />



      {/* ── Stats Bar ── */}
      <section className=" bg-card/50 py-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center px-4"
            >
              <span className="text-3xl font-black text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground mt-1">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The Problem We Solve ── */}
      <section className="py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <Badge variant="destructive">The Problem</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Great Events Shouldn't<br />Have a <span className="text-red-500">Zip Code.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every year, millions of fans miss out on concerts, tournaments, masterclasses, and live events 
              simply because they can't be there in person. Distance, cost, and capacity limits shouldn't 
              decide who gets to experience the world's best moments.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              And for creators? Traditional platforms take massive cuts, bury content in algorithms, and 
              offer zero control over pricing. Xonnect flips that model entirely.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Our Mission</p>
                <p className="text-sm text-muted-foreground">Make every live experience accessible to everyone, everywhere.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Users, label: "For Viewers", desc: "Watch any event, anywhere, on any device. Pay only for what you love." },
              { icon: Tv, label: "For Creators", desc: "Go live in minutes. Set your price. Keep 70% of every sale." },
              { icon: Globe, label: "Global Reach", desc: "Your audience isn't limited to your city — it's the entire world." },
              { icon: TrendingUp, label: "Real Earnings", desc: "Transparent payouts, real-time analytics, zero hidden fees." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 space-y-3"
              >
                <div className="w-10 h-10 bg-red-600/15 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-red-500" />
                </div>
                <p className="font-bold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-20 px-4 sm:px-6 md:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="destructive" className="mb-4">What We Stand For</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Six principles that guide every decision we make — from product features to creator policies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:border-red-500/40 transition-colors"
              >
                <div className="w-12 h-12 bg-red-600/15 rounded-xl flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-bold text-foreground text-lg">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="destructive" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">From Idea to Impact</h2>
            <p className="text-muted-foreground text-lg">Three years of building, learning, and growing together.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-8 items-start pl-4"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center z-10 relative">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-6 flex-1">
                    <span className="text-red-500 font-black text-sm">{m.year}</span>
                    <h3 className="font-bold text-foreground text-lg mt-1 mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 px-4 sm:px-6 md:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="destructive" className="mb-4">The Team</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">People Behind Xonnect</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A small, passionate team obsessed with live experiences, creator economics, and global connection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 hover:border-red-500/40 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500/30 flex items-center justify-center mx-auto">
                  <span className="text-red-400 font-black text-lg">{member.avatar}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-xs text-red-500 font-semibold mt-1">{member.role}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="destructive" className="mb-6">Join the Movement</Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              Be Part of<br />What's Next.
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Whether you're a creator ready to monetize your passion or a viewer hungry for authentic live experiences — Xonnect is your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 gap-2">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tv">
                <Button size="lg" variant="outline" className="border-border font-semibold px-10">
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
