import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import ResumeSection from '@/components/sections/ResumeSection'

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <Projects />

        {/* Skills Section - Placeholder (needs design) */}
        <section id="skills" className="py-20 bg-[var(--background-secondary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--foreground)]">Skills</h2>
            <p className="text-lg text-[var(--foreground-muted)]">Skills section design coming soon...</p>
          </div>
        </section>

        <ResumeSection />
      </main>

      <Footer />
    </>
  )
}
