import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Shield, Save, Lock, Timer, Users, Key } from "lucide-react"

interface SecurityTabProps {
  settings: any
  updateSetting: (key: string, value: any) => void
  onSave: () => void
}

export default function SecurityTab({ settings, updateSetting, onSave }: SecurityTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-400" />
            Security Settings
          </CardTitle>
          <Button onClick={onSave} size="sm" className="bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            Update Security
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Timer className="w-4 h-4 text-blue-400" />
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              </div>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting("sessionTimeout", Number(e.target.value))}
                className="bg-muted border-border"
              />
              <p className="text-sm text-muted-foreground mt-1">Auto-logout after inactivity</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-yellow-400" />
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              </div>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => updateSetting("maxLoginAttempts", Number(e.target.value))}
                className="bg-muted border-border"
              />
              <p className="text-sm text-muted-foreground mt-1">Before temporary lockout</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Key className="w-4 h-4 text-green-400" />
                <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
              </div>
              <Input
                id="passwordMinLength"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => updateSetting("passwordMinLength", Number(e.target.value))}
                className="bg-muted border-border"
              />
              <p className="text-sm text-muted-foreground mt-1">Minimum characters required</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-4 h-4 text-purple-400" />
                <div>
                  <Label htmlFor="requireTwoFactor" className="cursor-pointer">
                    Require Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-muted-foreground">For all admin users</p>
                </div>
              </div>
              <Switch
                id="requireTwoFactor"
                checked={settings.requireTwoFactor}
                onCheckedChange={(checked) => updateSetting("requireTwoFactor", checked)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold mb-4">Security Policies</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="passwordHistory" defaultChecked className="rounded" />
                <Label htmlFor="passwordHistory" className="text-sm">Prevent password reuse (last 5 passwords)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="passwordExpiry" defaultChecked className="rounded" />
                <Label htmlFor="passwordExpiry" className="text-sm">Require password change every 90 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ipWhitelist" className="rounded" />
                <Label htmlFor="ipWhitelist" className="text-sm">Enable IP whitelisting for admin panel</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
