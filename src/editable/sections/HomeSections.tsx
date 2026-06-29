import Link from 'next/link'
import { ArrowRight, Camera, ChevronRight, Compass, Grid2x2, Image as ImageIcon, Layers3, Search, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function sectionPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

function safeImage(post?: SitePost | null) {
  return getEditablePostImage(post)
}

function HeroCard({ post, href }: { post: SitePost; href: string }) {
  if (!post) return null
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-[2rem] border border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,11,22,0.08),rgba(18,11,22,0.8))]" />
      <img src={safeImage(post)} alt={post.title} className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.04] sm:h-[520px]" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-cream)]">
            {categoryOf(post)}
          </span>
          <span className="rounded-full bg-[rgba(255,248,234,0.12)] px-4 py-2 text-xs font-semibold text-[var(--slot4-cream)]">
            Explore
          </span>
        </div>
        <div className="max-w-2xl">
          <h2 className="editable-display text-4xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.6rem]">
            {post.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            {getEditableExcerpt(post, 170) || pagesContent.home.hero.description}
          </p>
          <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--slot4-dark-bg)]">
            View collection <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function CompactFeatureCard({ post, href, label }: { post: SitePost; href: string; label: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.6rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.04)]">
      <div className="aspect-[5/4] overflow-hidden">
        <img src={safeImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--slot4-accent)]">{label}</p>
        <h3 className="mt-3 text-xl font-semibold leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 88)}</p>
      </div>
    </Link>
  )
}

function MasonryImageCard({ post, href, tall = false }: { post: SitePost; href: string; tall?: boolean }) {
  return (
    <Link href={href} className="group block break-inside-avoid overflow-hidden rounded-[1.5rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.04)]">
      <div className={`overflow-hidden ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <img src={safeImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--slot4-page-text)]">{post.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">{categoryOf(post)}</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
      </div>
    </Link>
  )
}

function HorizontalCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-5 overflow-hidden rounded-[1.6rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.04)] p-4 sm:grid-cols-[260px_minmax(0,1fr)]">
      <div className="overflow-hidden rounded-[1.2rem]">
        <img src={safeImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="min-w-0 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
          Story {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-cream)]">
          Open story <ChevronRight className="h-4 w-4 text-[var(--slot4-accent)]" />
        </span>
      </div>
    </Link>
  )
}

function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-start gap-4 rounded-[1.35rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.03)] p-4 transition duration-300 hover:border-[var(--slot4-accent)]">
      <span className="editable-display mt-1 text-3xl font-semibold text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{categoryOf(post)}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-cream)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 105)}</p>
      </div>
    </Link>
  )
}

function GridImageCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.5rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.04)]">
      <div className="aspect-[1/1] overflow-hidden">
        <img src={safeImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="p-4">
        <h3 className="truncate text-base font-semibold text-[var(--slot4-page-text)]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = sectionPosts(posts, timeSections)
  const heroPost = pool[0]
  const secondary = pool.slice(1, 3)
  const tabs = ['For You', 'Explore']
  const navCards = [
    { label: 'Visual stories', icon: Camera },
    { label: 'Discovery', icon: Compass },
    { label: 'Profiles', icon: UserRound },
    { label: 'Collections', icon: Layers3 },
  ]

  return (
    <section className="pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className={`${container}`}>
        <div className="mb-8 flex items-center justify-center gap-3 text-sm font-semibold">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={`rounded-full px-5 py-3 ${index === 1 ? 'bg-[rgba(255,248,234,0.12)] text-[var(--slot4-cream)]' : 'text-[var(--slot4-muted-text)]'}`}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          {heroPost ? <HeroCard post={heroPost} href={postHref(primaryTask, heroPost, primaryRoute)} /> : null}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.04)] p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">
                {pagesContent.home.hero.badge || 'Featured'}
              </p>
              <h1 className="editable-display mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--slot4-cream)]">
                Discover premium image and profile stories.
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">
                Search, browse, and revisit standout posts and curated public content in one refined destination.
              </p>
              <form action="/search" className="mt-6 flex items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[rgba(255,248,234,0.03)] px-4 py-3">
                <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
                <input
                  name="q"
                  placeholder="Search images, names, or topics"
                  className="min-w-0 flex-1 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
                />
              </form>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'image' && task.key !== 'profile').slice(0, 6).map((task) => (
                  <Link
                    key={task.key}
                    href={task.route}
                    className="rounded-full border border-[var(--editable-border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-cream)]"
                  >
                    {task.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {secondary.map((post, index) => (
                <CompactFeatureCard
                  key={post.id || post.slug}
                  post={post}
                  href={postHref(primaryTask, post, primaryRoute)}
                  label={index === 0 ? 'Trending now' : 'Editors pick'}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {navCards.map(({ label, icon: Icon }) => (
            <div key={label} className="rounded-[1.4rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.03)] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(230,132,87,0.14)] text-[var(--slot4-accent)]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-semibold text-[var(--slot4-page-text)]">{label}</p>
              <p className="mt-1 text-sm text-[var(--slot4-muted-text)]">Distinct layouts for discovery, browsing, and profile-led content.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = sectionPosts(posts, timeSections).slice(0, 8)
  if (!pool.length) return null

  return (
    <section className="py-8 sm:py-12">
      <div className={`${container}`}>
        <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">Why explore here</p>
            <h2 className="editable-display mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--slot4-cream)] sm:text-5xl">
              Curated visual discovery with room to browse deeply.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">
              The homepage blends bold hero storytelling, image-led grids, compact editorial rails, and profile-friendly sections so every route feels intentional.
            </p>
            <Link
              href={primaryRoute}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-6 py-3 text-sm font-bold text-[var(--slot4-on-accent)]"
            >
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="columns-2 gap-4 sm:columns-3">
            {pool.map((post, index) => (
              <MasonryImageCard
                key={post.id || post.slug}
                post={post}
                href={postHref(primaryTask, post, primaryRoute)}
                tall={index % 3 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = sectionPosts(posts, timeSections)
  const lead = pool.slice(0, 4)
  const list = pool.slice(4, 8)
  if (!lead.length) return null

  return (
    <section className="py-8 sm:py-12">
      <div className={`${container}`}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">Popular selections</p>
            <h2 className="editable-display mt-3 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--slot4-cream)]">
              Featured stories and image-rich highlights.
            </h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)] sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5">
            {lead.slice(0, 2).map((post, index) => (
              <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[rgba(255,248,234,0.03)] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
              <Sparkles className="h-4 w-4" /> Quick reads
            </div>
            <div className="mt-5 grid gap-4">
              {list.map((post, index) => (
                <EditorialListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string; icon: typeof Grid2x2 }> = {
  spotlight: { eyebrow: 'Fresh drops', title: 'New arrivals worth opening', icon: Sparkles },
  browse: { eyebrow: 'Explore more', title: 'Browse image-first discoveries', icon: ImageIcon },
  index: { eyebrow: 'Profiles and archives', title: 'Revisit standout people and posts', icon: Grid2x2 },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const fallback = sectionPosts(posts, timeSections)
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: fallback.slice(0, 4), href: primaryRoute },
          { key: 'browse', posts: fallback.slice(4, 10), href: primaryRoute },
          { key: 'index', posts: fallback.slice(10, 16), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || sectionCopy.spotlight
        const Icon = copy.icon
        const items = section.posts.slice(0, 6)
        return (
          <section key={section.key} className="py-8 sm:py-12">
            <div className={`${container}`}>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">
                    <Icon className="h-4 w-4" /> {copy.eyebrow}
                  </p>
                  <h2 className="editable-display mt-3 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--slot4-cream)]">
                    {copy.title}
                  </h2>
                </div>
                <Link href={section.href || primaryRoute} className="hidden items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)] sm:inline-flex">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {index === 1 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((post) => (
                    <GridImageCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((post, itemIndex) => (
                    <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={itemIndex} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="pb-20 pt-10 sm:pb-24">
      <div className={`${container}`}>
        <div className="overflow-hidden rounded-[2.2rem] border border-[var(--editable-border)] bg-[linear-gradient(135deg,rgba(170,28,65,0.92),rgba(94,36,78,0.95)_52%,rgba(230,132,87,0.9))] px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-cream)]">Join the collection</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="editable-display text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl">
                Publish visual stories, showcase profiles, and keep discovery moving.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">
                Add a new post, share a profile, or open a fresh collection while keeping the same polished experience across every route.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--slot4-dark-bg)]">
                Create a post
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
