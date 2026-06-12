import { Button } from "@/components/ui/button"
import { RefreshCw, Save } from "lucide-react"

interface SettingsHeaderProps {
  onSave: () => void
  onReset: () => void
  isSaving: boolean
}

export default function SettingsHeader({ onSave, onReset, isSaving }: SettingsHeaderProps) {
  return (
    <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onReset} className="border-border bg-transparent">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={onSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700">
            {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}
