import { notFound } from 'next/navigation'

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  // For now, return 404 for all blog posts
  notFound()
}
