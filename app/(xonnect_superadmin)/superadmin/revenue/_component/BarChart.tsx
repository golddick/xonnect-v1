import { BarChart3 } from "lucide-react"

interface BarChartData {
  name: string
  value: number
  color: string
  percentage: number
}

interface BarChartProps {
  data: BarChartData[]
  title: string
}

export default function BarChartComponent({ data, title }: BarChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const maxValue = Math.max(...data.map(item => item.value))

  if (maxValue === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-2" />
          <p>No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-64">
      <h4 className="text-sm font-semibold mb-4 text-center">{title}</h4>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-semibold">{formatCurrency(item.value)}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{item.percentage}% of total</span>
              <span>{formatCurrency(item.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
