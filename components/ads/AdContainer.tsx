// components/ads/AdContainer.tsx
import { ReactNode } from 'react'

interface AdContainerProps {
  children: ReactNode
  onViewportEnter?: () => void
  className?: string
}

export const AdContainer = ({ children, onViewportEnter, className = '' }: AdContainerProps) => {
  const handleViewportEnter = () => {
    if (onViewportEnter) {
      onViewportEnter()
    }
  }

  return (
    <div 
      className={className}
      onMouseEnter={handleViewportEnter}
    >
      {children}
    </div>
  )
}