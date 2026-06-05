export function presentationPages(slug: string, count: number): readonly string[] {
  return Array.from(
    { length: count },
    (_, i) =>
      `/my-portfolio/images/projects/${slug}/presentation/page-${String(i + 1).padStart(2, '0')}.jpg`,
  )
}
