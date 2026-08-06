import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
} from "recharts"
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

  const chartData = data.map((item) => ({
    ...item,
    value: Number(item.value || 0),
  }))

  const maxValue = Math.max(...chartData.map((item) => item.value), 0)

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
    <div className="h-72">
      <h4 className="text-sm font-semibold mb-4 text-center">{title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="percentage" position="top" formatter={(value: number) => `${value}%`} />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
