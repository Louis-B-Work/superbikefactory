# SuperBike Factory: v1 (finance-only)

This is the marketing site for SuperBike Factory's relaunch as a **motorbike finance broker** (there's no bike stock). It's built with Next.js (App Router) and Tailwind CSS v4 and exported as a fully static site.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Vitest unit tests (finance maths)
npm run lint
npm run build   # static export to ./out (upload this folder to any static host)
```

## Where things live

| Path | What |
|---|---|
| `src/config/site.ts` | Nav, **quote CTA partner URL** (`primaryCta.url`), contact details, **compliance/FCA placeholders**, calculator APR and ranges |
| `src/content/finance.ts` | FAQs, finance types (HP/PCP), how-it-works steps, testimonials |
| `src/lib/finance.ts` | Repayment maths used by the calculator and the representative example |
| `src/components/` | Header, Footer, FinanceCalculator, QuoteCta (+ coming-soon notice), ReviewsCarousel, shared sections and UI |
| `src/app/` | Pages: `/`, `/about`, `/bike-finance`, `/bad-credit-finance`, `/privacy`, `/cookies`, `/complaints` |
| `src/content/badCredit.ts` | Original bad credit guidance: credit issues, lender checks, application stages, approval tips and FAQs |
| `src/content/bikeFinance.ts` | Detailed HP/PCP guidance and budget considerations for the Bike Finance page (separate from the home finance finder) |
| `src/content/whySuper.ts` | Home benefit-card text, destinations and temporary photo/focal-position assignments; replace these with the final portrait JPGs |
| `src/app/globals.css` | Fixed brand colours and semantic light/dark surface, text, border and highlight tokens |
| `src/lib/theme.ts`, `src/components/ThemeControl.tsx` | Theme initialization, preference helpers and accessible footer control |
| `public/logo.png`, `public/logo-dark.png` | Original logo (for dark backgrounds) and a navy variant generated from it for the white header/footer |
| `public/images/` | Unsplash placeholder photos (see `CREDITS.md`). Use high-resolution JPGs; resized WebP versions are generated automatically (see Notes) |
| `public/videos/` | Home hero video, plus a portrait crop of it that phones load instead (see `HeroVideo`) |

## Before going live

Search the codebase for `[PLACEHOLDER` and replace every hit. That includes:

- FCA FRN, company name/number, registered address and contact details (`src/config/site.ts`).
- The representative example and illustrative calculator APR. These **must** be real, approved lender figures (FCA CONC 3).
- The sample testimonials, which should be replaced with genuine reviews (e.g. a Trustpilot widget).
- The privacy, cookie and complaints page copy.
- `primaryCta.url` in `src/config/site.ts`: set it to the partner quote site. While it's empty, every "Get a quote" button shows a notice that quotes will soon be handled on a partner site. Once it's set, the buttons link straight there in a new tab.

## GitHub Pages

In repository **Settings > Pages**, select **GitHub Actions** as the build/deployment source. The [deployment workflow](.github/workflows/deploy-pages.yml) runs tests and lint, builds the static export (including responsive images), and deploys it on pushes to `main` or a manual workflow run.

The project URL is https://louis-b-work.github.io/superbikefactory/. The workflow reads the Pages base path and URL from `actions/configure-pages`, supplying `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` at build time. Next links are prefixed automatically; public assets, the logo's full-page redirect and metadata URLs use the shared deployment helpers. Local builds default to the root path and the configured production domain. A custom domain can be set in Pages settings; rebuild after changing it so paths and metadata match.

For a local project-path build in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/superbikefactory"
$env:NEXT_PUBLIC_SITE_URL = "https://louis-b-work.github.io/superbikefactory"
npm run build
```

Serve `out` mounted at `/superbikefactory/` to preview that build. Only source is committed; GitHub Actions generates and uploads `out`. GitHub Pages is static hosting, so the existing finance/compliance placeholders and partner URL still need approval before treating the site as a production launch.

## Notes

- Theme: the footer's policy-link row includes a `Theme: System / Light / Dark` button that cycles through those modes. System is the default and follows live OS changes; explicit choices override the OS. The `sbf-theme` localStorage preference survives reloads and synchronizes across tabs. An early root-layout script applies it before paint; with JavaScript disabled, CSS follows the OS instead and the control is omitted. If browser storage is blocked, the current-visit theme still works and the footer explains that it could not be saved. Light sections, navigation, footer, forms and the quote dialog use semantic theme colours; photographic and deliberately dark sections keep their original palettes. Keep fixed navy text on yellow buttons and use `ThemeLogo` when adding logos to theme-aware surfaces.
- `scripts/fix-export-segments.mjs` runs after `next build`. It works around a Windows-only Next.js 16 static-export bug in the paths of nested prefetch files, and does nothing on Linux/macOS.
- Images: a static export has no image server, so `scripts/optimise-images.mjs` runs before `dev` and `build`. It writes WebP versions of every JPG in `public/images/` at each responsive width to `public/_img/`, which is gitignored. A custom `next/image` loader (`src/lib/image-loader.ts`) points each image's `srcset` at them, so every device downloads only the size it needs. If you add or replace a photo while `npm run dev` is running, restart it (or run `node scripts/optimise-images.mjs`).
- Secondary pages: marketing pages use shorter still-image heroes and their own photography, not the home video/poster or closing CTA photo. `CtaBand` accepts `image`, `objectPosition` and `mirror` overrides; its defaults preserve the home treatment. `EditorialSection` and `FeatureCard` share the home design language, while `UtilityHero` keeps legal and 404 pages reading-focused. Section reveals, keyboard focus and reduced-motion/no-JavaScript visibility should be checked when changing these layouts. Expanded marketing copy remains subject to business and compliance approval before launch.
- Bad credit calculator: a standalone section uses `FinanceCalculator` with `editableAmounts` for whole-pound price/deposit entry, validated limits, term selection and an expanded repayment breakdown. It models HP only using the configured illustrative APR; it does not predict credit-profile rates, approval, PCP balloon payments or lender fees. Invalid entries hide the estimate until corrected. The Bike Finance calculator retains its sliders; Home links to it instead of embedding a calculator.
- Home finance finder: below the desktop breakpoint, selecting HP or PCP slides from the choices to that result instead of stacking them. "Change my selection" returns to the options and restores focus to the current choice. Arrow keys change the radio selection without navigating; "See my match" opens the selected result. Inactive panels are inert, reduced-motion skips the slide, and the desktop branch layout is unchanged.
- "Why so super?" uses a native horizontal portrait-card carousel with swipe and keyboard scrolling, linked cards, scroll reveals and reduced-motion-safe hover effects. Cards are centred when the full row fits; narrower screens scroll from the first card without navigation buttons. Its reveal threshold is 1%, so the next card's visible edge is not hidden by the animation on phones. It follows the supplied image-card reference without adding shadcn/Embla dependencies. Existing landscape motorcycle photos are temporary crops; add final portraits under `public/images/`, update `src/content/whySuper.ts` and image credits, then regenerate responsive variants.
- Replacing the hero video: re-create the portrait crop too, cut from the centre at full height. For example: `ffmpeg -i hero-home.mp4 -an -vf crop=810:900 -c:v libx264 -preset veryslow -crf 22 -pix_fmt yuv420p -movflags +faststart hero-home-portrait.mp4`.
- Hosting: serve `out/` with gzip/brotli compression on, and long-lived caching (`Cache-Control: public, max-age=31536000, immutable`) for `/_next/static/`. Those files have hashed names, so they never go stale.
