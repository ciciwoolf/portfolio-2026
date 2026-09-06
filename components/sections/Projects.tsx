import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Image from 'next/image';
import ArtVideo from '@/components/ui/ArtVideo';
import { Project } from '@/lib/types';
import projectsData from '@/content/projects.json';

export default function Projects() {
  const projects: Project[] = projectsData;

  return (
    <Section id="work" className="py-20 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-foreground">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="space-y-4">
                {/* Project Image or Video */}
                <div className="w-full h-64 bg-gradient-to-br from-surface to-surface-hover rounded-lg overflow-hidden border border-border relative">
                  {project.video ? (
                    <ArtVideo
                      publicId={project.video.publicId}
                      cloudName={project.video.cloudName}
                    />
                  ) : project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      unoptimized={project.image.includes('cloudinary')}
                    />
                  ) : null}
                </div>

                {/* Project Info */}
                <h3 className="text-2xl font-bold text-foreground">
                  {project.name}
                </h3>

                <p className="text-foreground-secondary">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-surface text-accent rounded-full border border-border"
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
                      className="text-accent hover:text-accent-hover hover:underline font-medium transition-colors"
                    >
                      Visit Site →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-hover hover:underline font-medium transition-colors"
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
  );
}
