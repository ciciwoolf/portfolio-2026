import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeProvider'

describe('ThemeProvider', () => {
  it('does not remount children after it mounts', () => {
    const onMount = vi.fn()

    function Child() {
      const { theme } = useTheme()
      useEffect(onMount, [])
      return <p>{theme}</p>
    }

    render(
      <ThemeProvider>
        <Child />
      </ThemeProvider>
    )

    expect(screen.getByText('dark')).toBeInTheDocument()
    expect(onMount).toHaveBeenCalledTimes(1)
  })
})
