import { Button } from "@/components/ui/button"
import { Filter, Download } from "lucide-react"

interface RevenueHeaderProps {
  selectedPeriod: string
  setSelectedPeriod: (period: string) => void
  loading: boolean
  exporting: boolean
  onRefresh: () => void
  onExport: () => void
}

export default function RevenueHeader({
  selectedPeriod,
  setSelectedPeriod,
  loading,
  exporting,
  onRefresh,
  onExport
}: RevenueHeaderProps) {
  return (
    <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Revenue Analytics</h1>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-transparent border border-border text-foreground px-4 py-2 rounded-lg"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <Button 
            variant="outline" 
            className="border-border bg-transparent"
            onClick={onRefresh}
            disabled={loading}
          >
            <Filter className="w-4 h-4 mr-2" />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-border bg-transparent"
            onClick={onExport}
            disabled={exporting}
          >
            <Download className="w-4 h-4 mr-2" />
            {exporting ? "Exporting..." : "Export Report"}
          </Button>
        </div>
      </div>
    </div>
  )
}
