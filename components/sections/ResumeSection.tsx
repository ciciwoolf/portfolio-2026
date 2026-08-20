import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import siteConfig from '@/content/site-config.json'

export default function ResumeSection() {
  return (
    <Section id="resume" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
          {siteConfig.resume.heading}
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
          {siteConfig.resume.description}
        </p>
        <a href={`/${siteConfig.resume.fileName}`} download={siteConfig.resume.fileName}>
          <Button size="lg">{siteConfig.resume.buttonText}</Button>
        </a>
      </div>
    </Section>
  )
}
