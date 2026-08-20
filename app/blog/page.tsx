import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Blog posts coming soon...
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
