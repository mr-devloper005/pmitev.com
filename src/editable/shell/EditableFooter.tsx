'use client'

import Link from 'next/link'
import { Camera, Compass, Layers3, Sparkles, type LucideIcon } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const footerHighlights: Array<{ label: string; icon: LucideIcon }> = [
  { label: 'Image-led', icon: Camera },
  { label: 'Refined discovery', icon: Compass },
  { label: 'Curated sections', icon: Layers3 },
]

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'image' && task.key !== 'profile')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="mt-auto border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 rounded-[2rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.03)] p-8 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] lg:p-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,248,234,0.04)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
              </span>
              <span className="editable-display text-2xl font-semibold text-[var(--slot4-cream)]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {footerHighlights.map(({ label, icon: ItemIcon }) => {
                return (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--slot4-muted-text)]">
                    <ItemIcon className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {label}
                  </span>
                )
              })}
            </div>
          </div>

          
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">Company</h3>
            <div className="mt-5 grid gap-3">
              <Link href="/about" className="text-sm text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-cream)]">About</Link>
              <Link href="/contact" className="text-sm text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-cream)]">Contact</Link>
              {session ? (
                <>
                  <Link href="/create" className="text-sm text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-cream)]">Create</Link>
                  <button type="button" onClick={logout} className="text-left text-sm text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-cream)]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-cream)]">Log in</Link>
                  <Link href="/signup" className="text-sm text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-cream)]">Sign up</Link>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">Highlights</h3>
            <div className="mt-5 space-y-4 text-sm text-[var(--slot4-muted-text)]">
              <p className="rounded-[1.25rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.03)] p-4">
                <span className="mb-2 inline-flex items-center gap-2 text-[var(--slot4-cream)]">
                  <Sparkles className="h-4 w-4 text-[var(--slot4-accent)]" /> Curated visuals
                </span>
                Fresh image, profile, and story collections in one polished interface.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[var(--editable-border)] pt-6 text-sm text-[var(--slot4-soft-muted-text)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="transition hover:text-[var(--slot4-cream)]">Terms</Link>
            <Link href="/contact" className="transition hover:text-[var(--slot4-cream)]">Privacy</Link>
            <Link href="/search" className="transition hover:text-[var(--slot4-cream)]">Browse</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
