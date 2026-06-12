import { PieChart as PieChartIcon } from "lucide-react"

interface PieChartData {
  name: string
  value: number
  color: string
  percentage: number
}

interface PieChartProps {
  data: PieChartData[]
  size?: number
}

export default function PieChartComponent({ data, size = 160 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let accumulatedAngle = 0

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <PieChartIcon className="w-12 h-12 mx-auto mb-2" />
          <p>No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <svg width={size} height={size} viewBox="0 0 100 100" className="mb-4">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100
          const angle = (percentage / 100) * 360
          const largeArcFlag = angle > 180 ? 1 : 0
          
          const x1 = 50 + 50 * Math.cos((accumulatedAngle * Math.PI) / 180)
          const y1 = 50 + 50 * Math.sin((accumulatedAngle * Math.PI) / 180)
          const x2 = 50 + 50 * Math.cos(((accumulatedAngle + angle) * Math.PI) / 180)
          const y2 = 50 + 50 * Math.sin(((accumulatedAngle + angle) * Math.PI) / 180)
          
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ')
          
          accumulatedAngle += angle
          
          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              stroke="#1f2937"
              strokeWidth="1"
            />
          )
        })}
        <circle cx="50" cy="50" r="30" fill="#111827" />
      </svg>
      
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
            <span className="text-xs font-semibold">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
