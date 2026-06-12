import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Percent, Save, Trash2 } from "lucide-react"
import type { SuperAdminSettingsSection, SuperAdminSettingsState } from "@/lib/superadmin-settings"

interface RevenueTabProps {
  settings: SuperAdminSettingsState
  updateSetting: (key: string, value: any) => void
  onSave: (section: SuperAdminSettingsSection) => Promise<void> | void
  onDelete: (section: SuperAdminSettingsSection) => Promise<void> | void
  hasRecord: boolean
  isSaving: boolean
  isDeleting: boolean
  isLoading: boolean
}

export default function RevenueTab({
  settings,
  updateSetting,
  onSave,
  onDelete,
  hasRecord,
  isSaving,
  isDeleting,
  isLoading,
}: RevenueTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="bg-card border border-border rounded-2xl hover:bg-card/70 transition-all duration-300 text-foreground">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Percent className="w-5 h-5 mr-2 text-green-400" />
            Platform Revenue Settings
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onDelete("revenue")}
              size="sm"
              variant="outline"
              disabled={!hasRecord || isDeleting || isLoading}
              className="border-red-500/40 text-red-300 hover:bg-red-500/10 hover:text-red-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button
              onClick={() => onSave("revenue")}
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              disabled={isSaving || isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              {hasRecord ? "Update Revenue Settings" : "Create Revenue Settings"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="platformFee">Platform Fee Percentage</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="platformFee"
                  type="number"
                  value={settings.platformFeePercentage}
                  onChange={(e) => updateSetting("platformFeePercentage", Number(e.target.value))}
                  className="bg-muted border-border"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Standard fee for all creators</p>
            </div>

            <div>
              <Label htmlFor="enterpriseFee">Enterprise Fee Percentage</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="enterpriseFee"
                  type="number"
                  value={settings.enterpriseFeePercentage}
                  onChange={(e) => updateSetting("enterpriseFeePercentage", Number(e.target.value))}
                  className="bg-muted border-border"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Fee for enterprise partnerships</p>
            </div>

            <div>
              <Label htmlFor="minPayout">Minimum Payout Amount</Label>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">$</span>
                <Input
                  id="minPayout"
                  type="number"
                  value={settings.minimumPayoutAmount}
                  onChange={(e) => updateSetting("minimumPayoutAmount", Number(e.target.value))}
                  className="bg-muted border-border"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">Minimum amount for payout requests</p>
            </div>

            <div>
              <Label htmlFor="processingDays">Payout Processing Days</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="processingDays"
                  type="number"
                  value={settings.payoutProcessingDays}
                  onChange={(e) => updateSetting("payoutProcessingDays", Number(e.target.value))}
                  className="bg-muted border-border"
                />
                <span className="text-muted-foreground">days</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Standard processing time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
