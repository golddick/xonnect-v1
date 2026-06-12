"use client"

import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
import Navigation from "../../../components/navigation"
import Footer from "../../../components/footer"
import Link from "next/link"

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for new creators getting started",
      icon: Zap,
      features: [
        "Up to 5 hours streaming per month",
        "Basic community features",
        "Standard video quality (720p)",
        "Basic analytics",
        "Community support",
        "Mobile streaming app",
      ],
      cta: "Get Started",
      popular: false,
      color: "gray",
    },
    {
      name: "Creator",
      price: "$19",
      period: "per month",
      description: "For serious creators building their audience",
      icon: Star,
      features: [
        "Unlimited streaming hours",
        "HD streaming (1080p)",
        "Advanced community tools",
        "Custom branding",
        "Detailed analytics",
        "Priority support",
        "Monetization tools",
        "Subscriber-only content",
        "Custom emotes",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "red",
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      description: "For established creators maximizing revenue",
      icon: Crown,
      features: [
        "Everything in Creator",
        "4K streaming quality",
        "Advanced monetization",
        "Multi-streaming",
        "API access",
        "White-label options",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced moderation tools",
        "Revenue analytics",
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "yellow",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For organizations and large-scale operations",
      icon: Rocket,
      features: [
        "Everything in Pro",
        "Custom infrastructure",
        "SLA guarantees",
        "On-premise deployment",
        "Custom development",
        "24/7 dedicated support",
        "Advanced security features",
        "Compliance certifications",
        "Training and onboarding",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "purple",
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a 14-day free trial for all paid plans. No credit card required to start your trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "You can cancel your subscription at any time. Your account will remain active until the end of your current billing period.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Simple, Transparent
              </span>
              <br />
              <span className="text-red-500">Pricing</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Choose the perfect plan for your creator journey. Start free and scale as you grow.
            </p>

            <div className="inline-flex items-center space-x-2 bg-green-600/20 border border-green-600/30 text-green-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm">
              <Check className="w-4 h-4" />
              <span>14-day free trial • No credit card required</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 ${
                  plan.popular ? "border-red-500 scale-105 lg:scale-110" : "border-white/10 hover:scale-105"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      plan.color === "red"
                        ? "bg-red-600/20"
                        : plan.color === "yellow"
                          ? "bg-yellow-600/20"
                          : plan.color === "purple"
                            ? "bg-purple-600/20"
                            : "bg-gray-600/20"
                    }`}
                  >
                    <plan.icon
                      className={`w-6 h-6 ${
                        plan.color === "red"
                          ? "text-red-400"
                          : plan.color === "yellow"
                            ? "text-yellow-400"
                            : plan.color === "purple"
                              ? "text-purple-400"
                              : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && plan.price !== "Custom" && (
                      <span className="text-gray-400 text-sm">/{plan.period}</span>
                    )}
                    {plan.price === "Custom" && <span className="text-gray-400 text-sm"> - {plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "/creator/signup"}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-red-500">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know about our pricing and plans.</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get <span className="text-red-500">Started</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of creators who are already building their communities on Xonnect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/creator/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PricingPage
