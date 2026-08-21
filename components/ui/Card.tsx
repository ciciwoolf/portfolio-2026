import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-[var(--surface)] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-[var(--border)] ${className}`}
    >
      {children}
    </div>
  )
}
