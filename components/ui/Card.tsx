import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-surface hover:bg-surface-hover rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-border ${className}`}
    >
      {children}
    </div>
  )
}
