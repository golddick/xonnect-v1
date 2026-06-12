import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Server, Save } from "lucide-react"

interface SystemTabProps {
  settings: any
  updateSetting: (key: string, value: any) => void
  onSave: () => void
}

export default function SystemTab({ settings, updateSetting, onSave }: SystemTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Server className="w-5 h-5 mr-2 text-purple-400" />
            System Configuration
          </CardTitle>
          <Button onClick={onSave} size="sm" className="bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            Update System Config
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="maxUpload">Max Upload Size (MB)</Label>
              <Input
                id="maxUpload"
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) => updateSetting("maxUploadSize", Number(e.target.value))}
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="maxDuration">Max Stream Duration (minutes)</Label>
              <Input
                id="maxDuration"
                type="number"
                value={settings.maxStreamDuration}
                onChange={(e) => updateSetting("maxStreamDuration", Number(e.target.value))}
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="streamQuality">Default Stream Quality</Label>
              <select
                id="streamQuality"
                value={settings.defaultStreamQuality}
                onChange={(e) => updateSetting("defaultStreamQuality", e.target.value)}
                className="w-full bg-muted border border-border text-foreground px-3 py-2 rounded-lg"
              >
                <option value="720p">720p HD</option>
                <option value="1080p">1080p Full HD</option>
                <option value="1440p">1440p 2K</option>
                <option value="2160p">2160p 4K</option>
              </select>
            </div>

            <div>
              <Label htmlFor="fileTypes">Allowed File Types</Label>
              <Input
                id="fileTypes"
                value={settings.allowedFileTypes}
                onChange={(e) => updateSetting("allowedFileTypes", e.target.value)}
                className="bg-muted border-border"
                placeholder="mp4,mov,avi,mkv"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
