import { Button } from "@/components/ui/button"

interface CategoryTabsProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export default function CategoryTabs({ 
  selectedCategory, 
  setSelectedCategory 
}: CategoryTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "events", label: "Events" },
    { id: "videos", label: "Premium Videos" },
  ]

  return (
    <div className="flex space-x-2 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={selectedCategory === tab.id ? "default" : "outline"}
          onClick={() => setSelectedCategory(tab.id)}
          className={
            selectedCategory === tab.id 
              ? "bg-red-600 hover:bg-red-700 text-foreground" 
              : "border-border bg-transparent text-foreground hover:bg-white/5"
          }
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
