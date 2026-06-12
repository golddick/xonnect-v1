'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Shield, Users, Zap, BarChart3, Headphones, Globe, ArrowRight, Video, Calendar, Tv, Handshake } from "lucide-react"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import HeroSection2 from "../../_component/heroSection"

// Define types for our data structures
interface ButtonData {
  text: string;
  icon?: LucideIcon;
  variant: "default" | "outline" | "link" | "destructive" | "secondary" | "ghost";
  className: string;
  link: string;
}

interface BenefitCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface PricingPlan {
  title: string;
  description: string;
  included: {
    title: string;
    items: string[];
  };
  benefits: {
    title: string;
    items: string[];
  };
  button: {
    text: string;
    icon: LucideIcon;
  };
}

export default function EnterprisePage() {
  // Hero section data
  const heroData = {
    badge: {
      icon: Handshake,
      text: "Xonnect Partnership"
    },
    title: "Stream Your Events with Xonnect",
    buttons: [
      {
        text: "Become a Partner",
        icon: ArrowRight,
        variant: "default" as const,
        className: "bg-red-600 hover:bg-red-700 text-lg px-6 sm:px-8 md:px-10 py-4 h-auto w-full sm:w-auto",
        link: "/enterprise/form"
      },
      {
        text: "Schedule Demo",
        variant: "outline" as const,
        className: "text-lg px-6 sm:px-8 md:px-10 py-4 h-auto border-white text-white hover:bg-white hover:text-black bg-transparent w-full sm:w-auto",
        link: "/enterprise/form"
      }
    ] as ButtonData[]
  }

  // Partnership benefits data
  const benefitsData = {
    title: "Why Partner with Xonnect?",
    description: "We become your dedicated streaming team so you can focus on what matters most to your event",
    cards: [
      {
        icon: Video,
        title: "End-to-End Streaming",
        description: "We handle everything from technical setup to broadcasting and post-event analytics."
      },
      {
        icon: Tv,
        title: "Professional Quality",
        description: "Broadcast-grade streaming with multi-camera support, graphics, and professional production."
      },
      {
        icon: Calendar,
        title: "Flexible Scheduling",
        description: "Stream any number of events with our dedicated team ready when you need us."
      }
    ] as BenefitCard[]
  }

  // Features data
  const featuresData = {
    title: "Partnership Features",
    description: "Everything we provide to make your event streaming seamless and professional",
    cards: [
      {
        icon: Shield,
        title: "Dedicated Streaming Team",
        description: "Your events get a dedicated team of streaming professionals who manage all technical aspects.",
        items: [
          "Technical directors",
          "Broadcast operators",
          "Quality assurance specialists"
        ]
      },
      {
        icon: Headphones,
        title: "Event Support",
        description: "Technical support before, during, and after your event to ensure flawless execution.",
        items: [
          "Pre-event testing",
          "Live technical support",
          "Post-event consultation"
        ]
      },
      {
        icon: Zap,
        title: "Custom Branding",
        description: "Your events maintain brand consistency with custom overlays, graphics, and player styling.",
        items: [
          "Branded overlays",
          "Custom lower thirds",
          "White-label options"
        ]
      }
    ] as FeatureCard[]
  }

  // How it works data
  const processData = {
    title: "How Our Partnership Works",
    description: "A streamlined process that makes event streaming effortless for your organization",
    steps: [
      {
        number: 1,
        title: "Consultation",
        description: "We learn about your event needs and technical requirements"
      },
      {
        number: 2,
        title: "Planning",
        description: "Our team creates a customized streaming plan for your event"
      },
      {
        number: 3,
        title: "Execution",
        description: "We handle all technical aspects while you focus on your event"
      },
      {
        number: 4,
        title: "Analysis",
        description: "Receive detailed analytics and feedback for future events"
      }
    ] as ProcessStep[]
  }

  // Pricing data
  const pricingData = {
    title: "Partnership Plans",
    description: "Flexible options based on your event volume and needs",
    plan: {
      title: "Custom Event Partnership",
      description: "Tailored streaming solutions for your organization's events",
      included: {
        title: "What's Included:",
        items: [
          "Dedicated streaming team",
          "Multi-platform distribution",
          "Custom branding",
          "Technical support"
        ]
      },
      benefits: {
        title: "Partnership Benefits:",
        items: [
          "Volume discounts",
          "Priority scheduling",
          "Dedicated account manager",
          "Custom contract terms"
        ]
      },
      button: {
        text: "Discuss Partnership Options",
        icon: ArrowRight
      }
    } as PricingPlan
  }

  // CTA data
  const ctaData = {
    title: "Ready to Stream Your Events with Confidence?",
    description: "Partner with Xonnect for professional video coverage and streaming solutions for your events. Join organizations worldwide that trust us to professionally stream their events while they focus on delivering amazing experiences.",
    buttons: [
      {
        text: "Become a Partner",
        link: '/enterprise/form',
        icon: ArrowRight,
        variant: "default" as const,
        className: "bg-red-600 hover:bg-red-700 text-lg px-6 sm:px-8 md:px-10 py-4 h-auto w-full sm:w-auto"
      },
    ] as ButtonData[]
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10">
        <HeroSection2
          title={heroData.badge.text}
          ICON={<heroData.badge.icon className="w-4 h-4" />}
          iconTitle="Our Partnership"
        />
      </div>

      {/* Partnership Benefits */}
      <section className="relative z-10 py-8 md:py-8">
        <div className="max-w-6xl 2xl:max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">{benefitsData.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {benefitsData.description}
            </p>
          </div>

        {/*  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">*/}
        {/*    {benefitsData.cards.map((card, index) => (*/}
        {/*      <Card key={index} className="bg-card text-card-foreground border-border hover:border-red-600/50 transition-all duration-300 group">*/}
        {/*        <CardContent className="p-6 sm:p-8 text-center">*/}
        {/*          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform">*/}
        {/*            <card.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />*/}
        {/*          </div>*/}
        {/*          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{card.title}</h3>*/}
        {/*          <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">*/}
        {/*            {card.description}*/}
        {/*          </p>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-12 md:py-20 bg-muted/30">
        <div className="max-w-6xl 2xl:max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuresData.cards.map((card, index) => (
              <Card key={index} className="bg-card text-card-foreground border-border hover:border-red-600/50 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <card.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{card.title}</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {card.description}
                  </p>
                  <ul className="space-y-2 sm:space-y-3">
                    {card.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-sm sm:text-base">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="max-w-6xl 2xl:max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{processData.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {processData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processData.steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg shadow-red-600/20">
                  <span className="text-xl sm:text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-12 md:py-20 bg-muted/30">
        <div className="max-w-6xl 2xl:max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{pricingData.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">{pricingData.description}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card text-card-foreground border-red-600/50 border-2 shadow-xl shadow-red-600/5">
              <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{pricingData.plan.title}</h3>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12">{pricingData.plan.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">{pricingData.plan.included.title}</h4>
                    <ul className="space-y-3 sm:space-y-4 text-left">
                      {pricingData.plan.included.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 sm:gap-3">
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">{pricingData.plan.benefits.title}</h4>
                    <ul className="space-y-3 sm:space-y-4 text-left">
                      {pricingData.plan.benefits.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 sm:gap-3">
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/enterprise/form" className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 sm:px-12 py-4 h-auto w-full sm:w-auto text-white">
                    {pricingData.plan.button.text}
                    <pricingData.plan.button.icon className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}