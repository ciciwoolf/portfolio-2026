import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary:
      'bg-accent-button text-[var(--foreground-on-accent)] hover:bg-accent-button-hover focus:ring-accent',
    secondary:
      'bg-surface text-foreground hover:bg-surface-hover focus:ring-accent border border-border',
    outline:
      'border-2 border-border text-foreground hover:bg-surface focus:ring-accent',
    cta: 'cta-button focus:ring-accent',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {variant === 'cta' ? (
        <>
          <span className="cta-circle" />
          <span className="cta-text">{children}</span>
          <span className="cta-arrow" aria-hidden="true">
            <svg viewBox="0 0 18 18" fill="currentColor">
              <path d="M9.9 3C9.9 2.50294 9.49706 2.1 9 2.1C8.50294 2.1 8.1 2.50294 8.1 3L9.9 3ZM8.3636 16.6364C8.71508 16.9879 9.28492 16.9879 9.6364 16.6364L15.364 10.9088C15.7154 10.5574 15.7154 9.98751 15.364 9.63604C15.0125 9.28457 14.4426 9.28457 14.0912 9.63604L9 14.7272L3.90883 9.63604C3.55736 9.28457 2.98751 9.28457 2.63604 9.63604C2.28457 9.98751 2.28457 10.5574 2.63604 10.9088L8.3636 16.6364ZM8.1 3L8.1 16L9.9 16L9.9 3L8.1 3Z" />
            </svg>
          </span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
