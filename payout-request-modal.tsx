"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  X,
  DollarSign,
  CreditCard,
  Building,
  User,
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PayoutRequestModalProps {
  isOpen: boolean
  onClose: () => void
  availableAmount: number
}

const PayoutRequestModal = ({ isOpen, onClose, availableAmount }: PayoutRequestModalProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [payoutData, setPayoutData] = useState({
    amount: availableAmount,
    method: "",
    // Bank Transfer Details
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
    // PayPal Details
    paypalEmail: "",
    // Address Details
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setCurrentStep(4) // Success step
  }

  const paymentMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct deposit to your bank account",
      fee: "Free",
      processingTime: "3-5 business days",
      icon: Building,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Transfer to your PayPal account",
      fee: "2.9%",
      processingTime: "1-2 business days",
      icon: CreditCard,
    },
  ]

  const steps = [
    { number: 1, title: "Amount", description: "Select payout amount" },
    { number: 2, title: "Method", description: "Choose payment method" },
    { number: 3, title: "Details", description: "Enter account details" },
    { number: 4, title: "Review", description: "Review and confirm" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Request Payout</h3>
              <p className="text-gray-400 mt-1">Withdraw your earnings</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

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
        </div>

        <div className="p-6">
          {/* Step 1: Amount */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center">
                <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Select Payout Amount</h4>
                <p className="text-gray-400">Choose how much you want to withdraw</p>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Payout Amount</Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">$</span>
                        <Input
                          id="amount"
                          type="number"
                          value={payoutData.amount}
                          onChange={(e) => setPayoutData({ ...payoutData, amount: Number(e.target.value) })}
                          className="bg-gray-900 border-gray-600 text-2xl font-bold text-center"
                          max={availableAmount}
                          min={50}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Available Balance</span>
                      <span className="font-semibold">${availableAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Minimum Payout</span>
                      <span>$50.00</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPayoutData({ ...payoutData, amount: 50 })}
                        className="border-gray-600 bg-transparent"
                      >
                        $50
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPayoutData({ ...payoutData, amount: Math.floor(availableAmount / 2) })}
                        className="border-gray-600 bg-transparent"
                      >
                        Half
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPayoutData({ ...payoutData, amount: availableAmount })}
                        className="border-gray-600 bg-transparent"
                      >
                        All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {payoutData.amount < 50 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <p className="text-sm text-yellow-400">Minimum payout amount is $50.00</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center">
                <CreditCard className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Choose Payment Method</h4>
                <p className="text-gray-400">Select how you want to receive your payout</p>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      payoutData.method === method.id
                        ? "bg-red-600/20 border-red-600/50"
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setPayoutData({ ...payoutData, method: method.id })}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-lg ${payoutData.method === method.id ? "bg-red-600" : "bg-gray-700"}`}
                        >
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">{method.name}</h5>
                          <p className="text-sm text-gray-400 mb-2">{method.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-green-400">Fee: {method.fee}</span>
                            <span className="text-blue-400">{method.processingTime}</span>
                          </div>
                        </div>
                        {payoutData.method === method.id && <CheckCircle className="w-5 h-5 text-red-400" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Account Details */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center">
                <User className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Account Details</h4>
                <p className="text-gray-400">
                  {payoutData.method === "bank" ? "Enter your bank account information" : "Enter your PayPal details"}
                </p>
              </div>

              {payoutData.method === "bank" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        value={payoutData.bankName}
                        onChange={(e) => setPayoutData({ ...payoutData, bankName: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="e.g., Chase Bank"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                      <Input
                        id="accountHolderName"
                        value={payoutData.accountHolderName}
                        onChange={(e) => setPayoutData({ ...payoutData, accountHolderName: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Full name on account"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        value={payoutData.accountNumber}
                        onChange={(e) => setPayoutData({ ...payoutData, accountNumber: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Account number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="routingNumber">Routing Number *</Label>
                      <Input
                        id="routingNumber"
                        value={payoutData.routingNumber}
                        onChange={(e) => setPayoutData({ ...payoutData, routingNumber: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="9-digit routing number"
                      />
                    </div>
                  </div>
                </div>
              )}

              {payoutData.method === "paypal" && (
                <div>
                  <Label htmlFor="paypalEmail">PayPal Email Address *</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <Input
                      id="paypalEmail"
                      type="email"
                      value={payoutData.paypalEmail}
                      onChange={(e) => setPayoutData({ ...payoutData, paypalEmail: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="your-email@example.com"
                    />
                  </div>
                </div>
              )}

              {/* Address Information */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={payoutData.address}
                      onChange={(e) => setPayoutData({ ...payoutData, address: e.target.value })}
                      className="bg-gray-900 border-gray-600"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={payoutData.city}
                        onChange={(e) => setPayoutData({ ...payoutData, city: e.target.value })}
                        className="bg-gray-900 border-gray-600"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        value={payoutData.state}
                        onChange={(e) => setPayoutData({ ...payoutData, state: e.target.value })}
                        className="bg-gray-900 border-gray-600"
                        placeholder="NY"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        value={payoutData.zipCode}
                        onChange={(e) => setPayoutData({ ...payoutData, zipCode: e.target.value })}
                        className="bg-gray-900 border-gray-600"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <select
                        id="country"
                        value={payoutData.country}
                        onChange={(e) => setPayoutData({ ...payoutData, country: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded-lg"
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Review Payout Request</h4>
                <p className="text-gray-400">Please review your payout details before submitting</p>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payout Amount</span>
                    <span className="font-bold text-2xl">${payoutData.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="font-semibold">
                      {paymentMethods.find((m) => m.id === payoutData.method)?.name}
                    </span>
                  </div>
                  {payoutData.method === "paypal" && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">PayPal Fee (2.9%)</span>
                      <span className="text-red-400">-${(payoutData.amount * 0.029).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">You'll Receive</span>
                      <span className="font-bold text-green-400 text-xl">
                        $
                        {payoutData.method === "paypal"
                          ? (payoutData.amount * 0.971).toFixed(2)
                          : payoutData.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-400 font-semibold mb-1">Processing Information</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>
                        • Processing time: {paymentMethods.find((m) => m.id === payoutData.method)?.processingTime}
                      </li>
                      <li>• You'll receive an email confirmation once processed</li>
                      <li>• Funds will be deposited to your selected account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-800">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="border-gray-700 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && payoutData.amount < 50) ||
                  (currentStep === 2 && !payoutData.method) ||
                  (currentStep === 3 &&
                    ((payoutData.method === "bank" &&
                      (!payoutData.bankName || !payoutData.accountNumber || !payoutData.routingNumber)) ||
                      (payoutData.method === "paypal" && !payoutData.paypalEmail)))
                }
                className="bg-red-600 hover:bg-red-700"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Payout Request
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PayoutRequestModal
