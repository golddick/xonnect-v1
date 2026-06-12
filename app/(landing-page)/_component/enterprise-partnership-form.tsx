"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building,
  Users,
  DollarSign,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
  Upload,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const EnterprisePartnership = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    companySize: "",
    industry: "",
    address: "",
    description: "",
    expectedUsers: "",
    budget: "",
    timeline: "",
    requirements: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setCurrentStep(4) // Success step
  }

  const benefits = [
    {
      icon: DollarSign,
      title: "Custom Revenue Sharing",
      description: "Negotiate better revenue splits based on your volume and commitment",
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Dedicated account manager and 24/7 priority technical support",
    },
    {
      icon: Zap,
      title: "Advanced Features",
      description: "Access to enterprise-only features and early beta releases",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Advanced analytics dashboard with custom reporting capabilities",
    },
  ]

  const steps = [
    { number: 1, title: "Company Info", description: "Basic company information" },
    { number: 2, title: "Requirements", description: "Your specific needs and goals" },
    { number: 3, title: "Review", description: "Review and submit your application" },
    { number: 4, title: "Success", description: "Application submitted successfully" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold mb-4"
            >
              Enterprise Partnership Program
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Join our enterprise program and unlock exclusive benefits, custom solutions, and dedicated support for
              your organization
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Enterprise Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-600/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Partnership Application</CardTitle>

              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.number
                          ? "bg-red-600 border-red-600 text-white"
                          : "border-gray-600 text-gray-400"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.number}</span>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-2 ${currentStep > step.number ? "bg-red-600" : "bg-gray-600"}`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <h3 className="font-semibold">{steps[currentStep - 1]?.title}</h3>
                <p className="text-sm text-gray-400">{steps[currentStep - 1]?.description}</p>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-gray-800 border-gray-700"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="website">Company Website</Label>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <Input
                            id="website"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="bg-gray-800 border-gray-700"
                            placeholder="https://yourcompany.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="companySize">Company Size *</Label>
                        <select
                          id="companySize"
                          value={formData.companySize}
                          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg"
                          required
                        >
                          <option value="">Select company size</option>
                          <option value="50-100">50-100 employees</option>
                          <option value="100-500">100-500 employees</option>
                          <option value="500-1000">500-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry *</Label>
                        <select
                          id="industry"
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg"
                          required
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology</option>
                          <option value="education">Education</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="media">Media & Entertainment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Company Address</Label>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-3" />
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="bg-gray-800 border-gray-700"
                          rows={3}
                          placeholder="Full company address"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Company Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        rows={4}
                        placeholder="Tell us about your company and what you do"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Requirements */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="expectedUsers">Expected Number of Users *</Label>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <Input
                            id="expectedUsers"
                            type="number"
                            value={formData.expectedUsers}
                            onChange={(e) => setFormData({ ...formData, expectedUsers: e.target.value })}
                            className="bg-gray-800 border-gray-700"
                            placeholder="e.g., 500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="budget">Estimated Monthly Budget *</Label>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <select
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg"
                            required
                          >
                            <option value="">Select budget range</option>
                            <option value="10k-25k">$10,000 - $25,000</option>
                            <option value="25k-50k">$25,000 - $50,000</option>
                            <option value="50k-100k">$50,000 - $100,000</option>
                            <option value="100k+">$100,000+</option>
                          </select>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="timeline">Implementation Timeline *</Label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg"
                          required
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (within 1 month)</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6months+">6+ months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requirements">Specific Requirements & Use Cases *</Label>
                      <Textarea
                        id="requirements"
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        rows={6}
                        placeholder="Describe your specific needs, use cases, integration requirements, and any custom features you need"
                        required
                      />
                    </div>

                    {/* File Upload Section */}
                    <div>
                      <Label>Supporting Documents (Optional)</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-red-600/50 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-2">Upload any relevant documents</p>
                        <p className="text-sm text-gray-500">
                          RFP, technical requirements, etc. (PDF, DOC, up to 10MB)
                        </p>
                        <Button type="button" variant="outline" className="mt-4 border-gray-700 bg-transparent">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Application Summary</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2">Company Information</h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-gray-400">Company:</span> {formData.companyName}
                            </p>
                            <p>
                              <span className="text-gray-400">Contact:</span> {formData.contactName}
                            </p>
                            <p>
                              <span className="text-gray-400">Email:</span> {formData.email}
                            </p>
                            <p>
                              <span className="text-gray-400">Size:</span> {formData.companySize}
                            </p>
                            <p>
                              <span className="text-gray-400">Industry:</span> {formData.industry}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-300 mb-2">Requirements</h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-gray-400">Expected Users:</span> {formData.expectedUsers}
                            </p>
                            <p>
                              <span className="text-gray-400">Budget:</span> {formData.budget}
                            </p>
                            <p>
                              <span className="text-gray-400">Timeline:</span> {formData.timeline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-300 mb-2">Description</h4>
                        <p className="text-sm text-gray-400">{formData.description}</p>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-300 mb-2">Requirements</h4>
                        <p className="text-sm text-gray-400">{formData.requirements}</p>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-400 mb-1">Next Steps</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Our enterprise team will review your application within 2 business days</li>
                            <li>• You'll receive a follow-up email to schedule a consultation call</li>
                            <li>• We'll prepare a custom proposal based on your requirements</li>
                            <li>• Implementation can begin as soon as the agreement is signed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Thank you for your interest in our Enterprise Partnership Program. Our team will review your
                      application and get back to you within 2 business days.
                    </p>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Application ID:{" "}
                        <span className="font-mono text-white">ENT-{Date.now().toString().slice(-6)}</span>
                      </p>
                      <Button onClick={() => (window.location.href = "/")} className="bg-red-600 hover:bg-red-700">
                        Return to Homepage
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex items-center justify-between pt-8 border-t border-gray-800">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                      className="border-gray-700 bg-transparent"
                    >
                      Previous
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default EnterprisePartnership
