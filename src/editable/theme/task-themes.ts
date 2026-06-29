import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Cormorant Garamond', 'Times New Roman', serif"
const BODY_FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif"

const base = {
  dark: true,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#120b16',
  surface: 'rgba(32,21,42,0.82)',
  raised: 'rgba(255,248,234,0.04)',
  text: '#fff1dd',
  muted: '#c9b0ae',
  line: 'rgba(255,232,180,0.12)',
  accent: '#e68457',
  accentSoft: 'rgba(230,132,87,0.12)',
  onAccent: '#160d19',
  glow: 'rgba(170,28,65,0.18)',
  radius: '1.75rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Journal', note: 'Long-form stories and sharp perspective in a polished editorial frame.' },
  listing: { ...base, kicker: 'Directory', note: 'Business profiles shaped like a refined private guide.' },
  classified: { ...base, kicker: 'Open Calls', note: 'Listings and offers with a confident luxury-market presentation.' },
  image: { ...base, kicker: 'Gallery', note: 'Image-led discovery with immersive layouts and cinematic contrast.' },
  sbm: { ...base, kicker: 'Links', note: 'Curated references in a streamlined premium resource board.' },
  pdf: { ...base, kicker: 'Documents', note: 'Reports and files presented like a private archive room.' },
  profile: { ...base, kicker: 'Profiles', note: 'Identity-first pages for featured people, teams, and brands.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': '#aa1c41',
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
