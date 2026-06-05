export type ContactChannel = 'email' | 'github' | 'linkedin' | 'blog' | 'instagram' | 'other'

export interface ContactLink {
  channel: ContactChannel
  label: string
  value: string
  href: string
}
