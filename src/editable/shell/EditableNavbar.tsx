'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const navItems = useMemo(
    () =>
      SITE_CONFIG.tasks
        .filter((task) => task.enabled && task.key !== 'image' && task.key !== 'profile')
        .map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[90px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,248,234,0.04)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="editable-display block truncate text-2xl font-semibold text-[var(--slot4-cream)]">{SITE_CONFIG.name}</span>
            <span className="hidden text-[10px] uppercase tracking-[0.32em] text-[var(--slot4-soft-muted-text)] md:block">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-4 hidden items-center gap-1 xl:flex">
          {navItems.slice(0, 5).map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-[rgba(255,232,180,0.12)] text-[var(--slot4-cream)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-white/5 hover:text-[var(--slot4-cream)]'
                }`}
              >
                {item.label}
                {index < 4 ? <ChevronDown className="h-3.5 w-3.5 opacity-60" /> : null}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto hidden items-center justify-center gap-3 lg:flex">
          <div className="inline-flex items-center rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <span className="border-r border-[var(--editable-border)] pr-3 text-sm font-medium text-[var(--slot4-cream)]">Explore</span>
            <form action="/search" className="ml-3 flex items-center gap-3">
              <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
              <input
                name="q"
                type="search"
                placeholder="Search collections and topics"
                className="w-[260px] bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)] xl:w-[320px]"
              />
            </form>
          </div>

          {session ? (
            <>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-105"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button type="button" onClick={logout} className="rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-cream)]">
                <LogIn className="h-4 w-4" /> Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-cream)] bg-[rgba(255,248,234,0.04)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-cream)] transition hover:bg-[var(--slot4-cream)] hover:text-[var(--slot4-dark-bg)]"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto rounded-full border border-[var(--editable-border)] bg-[rgba(255,248,234,0.04)] p-3 text-[var(--slot4-cream)] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[rgba(13,9,18,0.96)] px-4 py-5 lg:hidden">
          <form action="/search" className="flex items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search collections"
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </form>
          <div className="mt-4 grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }, { label: 'Logout', href: '#' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              if (item.label === 'Logout') {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="rounded-[1.1rem] border border-[var(--editable-border)] px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-page-text)]"
                  >
                    Logout
                  </button>
                )
              }
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-[1.1rem] border px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'border-[var(--slot4-accent)] bg-[rgba(230,132,87,0.12)] text-[var(--slot4-cream)]'
                      : 'border-[var(--editable-border)] text-[var(--slot4-page-text)] hover:border-[var(--slot4-accent)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
