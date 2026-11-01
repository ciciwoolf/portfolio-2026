import type { MetadataRoute } from 'next'
import siteConfig from '@/content/site-config.json'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.seo.url }]
}
