import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { Role } from "@/lib/generated/prisma"
import { resolvePaystackBankAccount, getPaystackSecretKey } from "@/lib/paystack"

const BANK_CODE_MAP: Record<string, string> = {
  "Access Bank": "044",
  UBA: "033",
  "Zenith Bank": "057",
  "First Bank": "011",
  OPay: "050",
  GTBank: "058",
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const bankName = typeof body.bankName === "string" ? body.bankName.trim() : null
    const accountNumber = typeof body.accountNumber === "string" ? body.accountNumber.trim() : null

    if (!bankName || !accountNumber) {
      return NextResponse.json({ message: "Bank name and account number are required" }, { status: 400 })
    }

    // Prefer explicit bank code if provided
    let bankCode: string | undefined = undefined
    if (typeof body.bankCode === "string" && body.bankCode.trim()) {
      bankCode = body.bankCode.trim()
    }

    // Try to resolve bank code from Paystack's bank list using the provided bank name
    if (!bankCode) {
      try {
        const secret = getPaystackSecretKey()
        const banksRes = await fetch("https://api.paystack.co/bank", {
          headers: { Authorization: `Bearer ${secret}` },
        })

        if (banksRes.ok) {
          const banksPayload = await banksRes.json().catch(() => null)
          const banks = Array.isArray(banksPayload?.data) ? banksPayload.data : []
          const lowerName = bankName.toLowerCase()
          const found = banks.find((b: any) => {
            const n = String(b.name || "").toLowerCase()
            const code = String(b.code || "").toLowerCase()
            return n === lowerName || n.includes(lowerName) || code === lowerName
          })
          if (found && found.code) bankCode = String(found.code)
        }
      } catch (err) {
        console.warn("Failed to fetch Paystack bank list:", err)
      }
    }

    // Fallback to static map if still unresolved
    if (!bankCode) {
      const fallback = BANK_CODE_MAP[bankName]
      if (fallback) bankCode = fallback
    }

    if (!bankCode) {
      return NextResponse.json({ message: "Unsupported bank selected or unable to determine bank code. Provide a bankCode if possible." }, { status: 400 })
    }

    if (!/^[0-9]{10}$/.test(accountNumber)) {
      return NextResponse.json({ message: "Account number must be 10 digits" }, { status: 400 })
    } 

    const accountName = await resolvePaystackBankAccount(accountNumber, bankCode)
    return NextResponse.json({ accountName }, { status: 200 })
  } catch (error) {
    console.error("Creator payout account resolve error:", error)
    return NextResponse.json({ message: "Failed to resolve account name" }, { status: 500 })
  }
}
