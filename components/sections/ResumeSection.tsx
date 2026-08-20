import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export default function ResumeSection() {
  return (
    <Section id="resume" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
          Resume
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
          Interested in working together? Download my resume to learn more about my
          experience and qualifications.
        </p>
        <a href="/resume.pdf" download="resume.pdf">
          <Button size="lg">Download Resume</Button>
        </a>
      </div>
    </Section>
  )
}
