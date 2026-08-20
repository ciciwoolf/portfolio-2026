import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero Section - Placeholder */}
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-800">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Hero Section</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">3D Scene + Hero Text (Coming Soon)</p>
          </div>
        </section>

        {/* Work Section - Placeholder */}
        <section id="work" className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Work</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Projects Grid (Coming Soon)</p>
          </div>
        </section>

        {/* Skills Section - Placeholder */}
        <section id="skills" className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-800">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Skills</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Skills Cards (Coming Soon)</p>
          </div>
        </section>

        {/* Resume Section - Placeholder */}
        <section id="resume" className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Resume</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Download Resume (Coming Soon)</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
