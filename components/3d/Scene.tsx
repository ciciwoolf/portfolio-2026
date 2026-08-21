'use client'

// Placeholder 3D Scene component
// Will be implemented in Session 3 (Tasks 21-24)
export default function Scene() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--surface)] to-[var(--surface-hover)] rounded-xl">
      <div className="text-center px-4">
        <p className="text-lg font-semibold text-[var(--foreground-secondary)] mb-2">
          3D Scene Placeholder
        </p>
        <p className="text-sm text-[var(--foreground-muted)]">
          Three.js scene will be implemented in Session 3
        </p>
      </div>
    </div>
  )
}
