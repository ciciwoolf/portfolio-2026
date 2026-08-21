import '@testing-library/jest-dom'

// Polyfill for ResizeObserver (needed for R3F tests)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
