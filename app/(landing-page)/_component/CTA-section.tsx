"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import React from 'react'

const CTASection = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="text-red-500">Journey</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of creators who are already building their communities and monetizing their content on
              Xonnect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/creator/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
    </div>
  )
}

export default CTASection
