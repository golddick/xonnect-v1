"use client"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "tickets", label: "All Tickets" },
    { key: "transactions", label: "Transactions" },
  ]

  return (
    <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 whitespace-nowrap text-sm font-medium transition-all border-b-2 ${
            activeTab === tab.key ? "border-red-600 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
