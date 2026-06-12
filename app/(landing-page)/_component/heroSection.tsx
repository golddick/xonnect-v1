import React from 'react'

import { motion } from "framer-motion"

interface HeroSectionProps {
    title: string
    ICON: React.ReactNode
    iconTitle: string
    
}

const HeroSection2 = (props: HeroSectionProps) => {
  return (
    <div>
          {/* Hero Section */}
        <section className="relative pt-32 pb-8 px-6 md:px-8 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 text-5xl md:text-6xl lg:text-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/30 text-red-500 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm mb-8">
                {props.ICON}
                <span>{props.iconTitle}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl items-center  max-w-4xl mx-auto font-black mb-6 leading-tight">
                <span className=" ">
                    {props.title}
                </span>
              </h1>

            </motion.div>
          </div>
        </section>
    </div>
  )
}

export default HeroSection2