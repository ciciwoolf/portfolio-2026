import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Project } from '@/lib/types'
import projectsData from '@/content/projects.json'

export default function Projects() {
  const projects: Project[] = projectsData

  return (
    <Section id="work" className="py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-[var(--foreground)]">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="space-y-4">
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-hover)] rounded-lg flex items-center justify-center">
                  <p className="text-[var(--foreground-muted)]">Project Image</p>
                </div>

                {/* Project Info */}
                <h3 className="text-2xl font-bold text-[var(--foreground)]">
                  {project.name}
                </h3>

                <p className="text-[var(--foreground-secondary)]">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-[var(--surface-hover)] text-[var(--foreground-secondary)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline font-medium"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline font-medium"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
