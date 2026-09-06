'use client'

import { useState } from 'react'
import Section from '@/components/ui/Section'
import { Experience } from '@/lib/types'
import experienceData from '@/content/experience.json'

export default function Skills() {
  const experiences: Experience[] = experienceData
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null)

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleMouseEnter = (id: string) => {
    setExpandedId(id)
  }

  return (
    <Section id="skills" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-foreground">
          Experience & Skills
        </h2>

        <div className="space-y-2">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-accent"
              onMouseEnter={() => handleMouseEnter(exp.id)}
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => handleToggle(exp.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-surface hover:bg-surface-hover transition-colors text-left"
                aria-expanded={expandedId === exp.id}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold text-foreground">
                      {exp.company}
                    </h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground-secondary">
                    {exp.role} • {exp.duration}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">{exp.type}</p>
                </div>

                {/* Chevron Icon */}
                <svg
                  className={`w-5 h-5 text-foreground-secondary transition-transform duration-300 ${
                    expandedId === exp.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedId === exp.id ? 'max-h-[800px]' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 bg-background-secondary border-t border-border">
                  {exp.description && (
                    <p className="text-sm text-foreground-secondary mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground-secondary mb-2">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2 text-sm text-foreground-secondary pl-4">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index} className="relative pl-2 before:content-['•'] before:absolute before:left-[-12px] before:text-accent">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <h4 className="text-sm font-medium text-foreground-secondary mb-3">
                    Technologies & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm bg-surface text-foreground rounded-md border border-border hover:border-accent hover:text-accent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
