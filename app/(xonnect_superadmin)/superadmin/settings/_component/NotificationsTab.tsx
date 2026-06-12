import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, Smartphone, Wrench, Save, CheckCircle, AlertTriangle, Info } from "lucide-react"

interface NotificationsTabProps {
  settings: any
  updateSetting: (key: string, value: any) => void
  onSave: () => void
}

export default function NotificationsTab({ settings, updateSetting, onSave }: NotificationsTabProps) {
  // Mock system notifications data
  const systemNotifications = [
    {
      id: 1,
      title: "System Update Available",
      message: "New system update v2.5.0 is available for installation",
      type: "info",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Revenue Threshold Reached",
      message: "Monthly revenue has exceeded $1,000,000",
      type: "success",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Database Backup Failed",
      message: "Scheduled database backup failed at 02:00 AM",
      type: "warning",
      time: "2 days ago",
      read: false,
    },
    {
      id: 4,
      title: "New User Registration",
      message: "Enterprise user 'TechCorp Inc.' has registered",
      type: "info",
      time: "3 days ago",
      read: true,
    },
    {
      id: 5,
      title: "Security Alert",
      message: "Multiple failed login attempts detected from unusual location",
      type: "warning",
      time: "4 days ago",
      read: true,
    },
  ]

  const markAllAsRead = () => {
    // In a real app, this would make an API call
    console.log("Marking all notifications as read")
  }

  const clearAllNotifications = () => {
    // In a real app, this would make an API call
    console.log("Clearing all notifications")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-yellow-400" />
              Notification Settings
            </CardTitle>
            <Button onClick={onSave} size="sm" className="bg-red-600 hover:bg-red-700">
              <Save className="w-4 h-4 mr-2" />
              Update Settings
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <Label htmlFor="emailNotifications" className="cursor-pointer">
                    Email Notifications
                  </Label>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-4 h-4 text-green-400" />
                  <Label htmlFor="smsNotifications" className="cursor-pointer">
                    SMS Notifications
                  </Label>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-purple-400" />
                  <Label htmlFor="pushNotifications" className="cursor-pointer">
                    Push Notifications
                  </Label>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Wrench className="w-4 h-4 text-orange-400" />
                  <Label htmlFor="maintenanceMode" className="cursor-pointer">
                    Maintenance Mode
                  </Label>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold mb-3">Notification Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="revenueAlerts" defaultChecked className="rounded" />
                  <Label htmlFor="revenueAlerts" className="text-sm">Revenue alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="userAlerts" defaultChecked className="rounded" />
                  <Label htmlFor="userAlerts" className="text-sm">User registration alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="systemAlerts" defaultChecked className="rounded" />
                  <Label htmlFor="systemAlerts" className="text-sm">System alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="securityAlerts" defaultChecked className="rounded" />
                  <Label htmlFor="securityAlerts" className="text-sm">Security alerts</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Notifications */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-400" />
              System Notifications
            </CardTitle>
            <div className="flex space-x-2">
              <Button onClick={markAllAsRead} size="sm" variant="outline" className="border-border">
                Mark All Read
              </Button>
              <Button onClick={clearAllNotifications} size="sm" variant="outline" className="border-border">
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.type === 'success' ? 'border-green-500/20 bg-green-500/5' :
                    notification.type === 'warning' ? 'border-yellow-500/20 bg-yellow-500/5' :
                    'border-blue-500/20 bg-blue-500/5'
                  } ${!notification.read ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />}
                      {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />}
                      {notification.type === 'info' && <Info className="w-5 h-5 text-blue-400 mt-0.5" />}
                      <div>
                        <h4 className="font-semibold">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <div className="flex justify-end mt-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-7"
                        onClick={() => console.log(`Mark notification ${notification.id} as read`)}
                      >
                        Mark as read
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
