export type SuperAdminSettingsSection = "revenue" | "company"

export type RevenueSettingsData = {
  platformFeePercentage: number
  enterpriseFeePercentage: number
  minimumPayoutAmount: number
  payoutProcessingDays: number
}

export type RevenueSettingsRecord = {
  platformFeePercentage: number | null
  enterpriseFeePercentage: number | null
  minimumPayoutAmount: number | null
  payoutProcessingDays: number | null
}

export type CompanySettingsData = {
  companyName: string
  companyEmail: string
  supportEmail: string
  companyPhone: string
  companyAddress: string
  companyWebsite: string
}

export type CompanySettingsRecord = {
  companyName: string | null
  companyEmail: string | null
  supportEmail: string | null
  companyPhone: string | null
  companyAddress: string | null
  companyWebsite: string | null
}

export type SuperAdminSettingsState = RevenueSettingsData & CompanySettingsData & {
  maxUploadSize: number
  maxStreamDuration: number
  defaultStreamQuality: string
  allowedFileTypes: string
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  maintenanceMode: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  requireTwoFactor: boolean
  passwordMinLength: number
  enterpriseMinUsers: number
  enterpriseCustomBranding: boolean
  enterpriseAnalytics: boolean
  enterprisePriority: boolean
}

export const defaultSuperAdminSettings: SuperAdminSettingsState = {
  platformFeePercentage: 10,
  enterpriseFeePercentage: 15,
  minimumPayoutAmount: 50,
  payoutProcessingDays: 3,
  companyName: "Xonnect Technologies Inc.",
  companyEmail: "admin@xonnect.com",
  supportEmail: "support@xonnect.com",
  companyPhone: "+1 (555) 123-4567",
  companyAddress: "123 Tech Street, San Francisco, CA 94105",
  companyWebsite: "https://xonnect.com",
  maxUploadSize: 500,
  maxStreamDuration: 480,
  defaultStreamQuality: "1080p",
  allowedFileTypes: "mp4,mov,avi,mkv,webm",
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  maintenanceMode: false,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  requireTwoFactor: false,
  passwordMinLength: 8,
  enterpriseMinUsers: 100,
  enterpriseCustomBranding: true,
  enterpriseAnalytics: true,
  enterprisePriority: true,
}

export const superAdminSectionMap = {
  revenue: "REVENUE",
  company: "COMPANY_INFO",
} as const

export const revenueSettingKeys = [
  "platformFeePercentage",
  "enterpriseFeePercentage",
  "minimumPayoutAmount",
  "payoutProcessingDays",
] as const satisfies readonly (keyof RevenueSettingsData)[]

export const companySettingKeys = [
  "companyName",
  "companyEmail",
  "supportEmail",
  "companyPhone",
  "companyAddress",
  "companyWebsite",
] as const satisfies readonly (keyof CompanySettingsData)[]

export function pickSectionSettings<T extends Record<string, unknown>, K extends readonly (keyof T)[]>(
  source: T,
  keys: K
): Pick<T, K[number]> {
  return keys.reduce((acc, key) => {
    acc[key] = source[key]
    return acc
  }, {} as Pick<T, K[number]>)
}

export function normalizeRevenueSettings(record?: Partial<RevenueSettingsRecord> | null): RevenueSettingsData {
  return {
    platformFeePercentage: record?.platformFeePercentage ?? defaultSuperAdminSettings.platformFeePercentage,
    enterpriseFeePercentage: record?.enterpriseFeePercentage ?? defaultSuperAdminSettings.enterpriseFeePercentage,
    minimumPayoutAmount: record?.minimumPayoutAmount ?? defaultSuperAdminSettings.minimumPayoutAmount,
    payoutProcessingDays: record?.payoutProcessingDays ?? defaultSuperAdminSettings.payoutProcessingDays,
  }
}

export function normalizeCompanySettings(record?: Partial<CompanySettingsRecord> | null): CompanySettingsData {
  return {
    companyName: record?.companyName ?? defaultSuperAdminSettings.companyName,
    companyEmail: record?.companyEmail ?? defaultSuperAdminSettings.companyEmail,
    supportEmail: record?.supportEmail ?? defaultSuperAdminSettings.supportEmail,
    companyPhone: record?.companyPhone ?? defaultSuperAdminSettings.companyPhone,
    companyAddress: record?.companyAddress ?? defaultSuperAdminSettings.companyAddress,
    companyWebsite: record?.companyWebsite ?? defaultSuperAdminSettings.companyWebsite,
  }
}
