import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Scene from './Scene'

describe('Scene', () => {
  it('renders canvas element', () => {
    const { container } = render(<Scene />)
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })
})
