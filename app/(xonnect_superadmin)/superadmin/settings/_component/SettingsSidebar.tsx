import { DollarSign, Building, Server, Bell, Shield } from "lucide-react"

interface SettingsSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  const tabs = [
    { id: "revenue", label: "Revenue & Fees", icon: DollarSign },
    { id: "company", label: "Company Info", icon: Building },
    { id: "system", label: "System Config", icon: Server },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ]

  return (
    <div className="w-60 bg-background border border-border p-2 hover:bg-card/70 transition-all duration-300 text-foreground min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-red-600 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
