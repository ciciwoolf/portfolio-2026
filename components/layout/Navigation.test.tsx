import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navigation from './Navigation'

describe('Navigation', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders brand link', () => {
    render(<Navigation />)
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(<Navigation />)
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })
})
