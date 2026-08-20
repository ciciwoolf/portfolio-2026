import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Project } from '@/lib/types'
import projectsData from '@/content/projects.json'

export default function Projects() {
  const projects: Project[] = projectsData

  return (
    <Section id="work" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-zinc-900 dark:text-zinc-50">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="space-y-4">
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-zinc-700 dark:to-zinc-800 rounded-lg flex items-center justify-center">
                  <p className="text-zinc-600 dark:text-zinc-400">Project Image</p>
                </div>

                {/* Project Info */}
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {project.name}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-300">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
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
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
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
