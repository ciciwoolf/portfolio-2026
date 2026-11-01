import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import siteConfig from '@/content/site-config.json'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.personal.name,
  alternateName: siteConfig.seo.alternateName,
  jobTitle: siteConfig.personal.title,
  url: siteConfig.seo.url,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Navigation />

      <main>
        <Hero />
        <Projects />
        <Skills />
      </main>

      <Footer />
    </>
  )
}
