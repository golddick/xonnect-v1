import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Building, Globe, Mail, Phone, MapPin, Save, Trash2 } from "lucide-react"
import type { SuperAdminSettingsSection, SuperAdminSettingsState } from "@/lib/superadmin-settings"

interface CompanyTabProps {
  settings: SuperAdminSettingsState
  updateSetting: (key: string, value: any) => void
  onSave: (section: SuperAdminSettingsSection) => Promise<void> | void
  onDelete: (section: SuperAdminSettingsSection) => Promise<void> | void
  hasRecord: boolean
  isSaving: boolean
  isDeleting: boolean
  isLoading: boolean
}

export default function CompanyTab({
  settings,
  updateSetting,
  onSave,
  onDelete,
  hasRecord,
  isSaving,
  isDeleting,
  isLoading,
}: CompanyTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="bg-card border border-border rounded-2xl hover:bg-card/70 transition-all duration-300 text-foreground">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-red-400" />
            Company Information
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onDelete("company")}
              size="sm"
              variant="outline"
              disabled={!hasRecord || isDeleting || isLoading}
              className="border-red-500/40 text-red-300 hover:bg-red-500/10 hover:text-red-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button
              onClick={() => onSave("company")}
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              disabled={isSaving || isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              {hasRecord ? "Update Company Info" : "Create Company Info"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => updateSetting("companyName", e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="companyWebsite">Website</Label>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="companyWebsite"
                  value={settings.companyWebsite}
                  onChange={(e) => updateSetting("companyWebsite", e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyEmail">Company Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="companyEmail"
                  type="email"
                  value={settings.companyEmail}
                  onChange={(e) => updateSetting("companyEmail", e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => updateSetting("supportEmail", e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyPhone">Phone Number</Label>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="companyPhone"
                  value={settings.companyPhone}
                  onChange={(e) => updateSetting("companyPhone", e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="companyAddress">Company Address</Label>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-3" />
              <Textarea
                id="companyAddress"
                value={settings.companyAddress}
                onChange={(e) => updateSetting("companyAddress", e.target.value)}
                className="bg-muted border-border"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
