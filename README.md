# Liberty Equity Holdings — Section 1

Boilerplate, theming system, logo/favicon, and Tailwind config.

## Setup

1. Unzip this into a folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run locally:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 — you should see the logo, theme toggle, and a "Section 1 Complete" placeholder page.

## What's included
- Next.js 14 App Router + TypeScript boilerplate
- `next-themes` dark/light system, hydration-safe (no flash/mismatch)
- Custom color tokens in `tailwind.config.ts` matching the spec palette
- `globals.css` with CSS variable-based theming + glassmorphism utility classes
- Custom SVG logo + favicon (no icon packs)

## Note on data
This project is being built as a portfolio piece. Balances, transactions, and
activity feeds added in later sections will be simulated/mock data — no real
payments or financial data are processed.

## Section 2 — added
- `src/components/landing/navbar.tsx` — glassmorphic sticky nav, shrinks/gains
  a glass background on scroll, mobile menu with animated collapse, theme
  toggle + auth links.
- `src/components/landing/hero.tsx` — headline, subcopy, dual CTAs, ambient
  glow background, staggered Framer Motion fade-up entrances.
- `src/components/landing/hero-ticker-strip.tsx` — animated ticker pills
  showing sample BTC/ETH/forex prices. **Mock data** — a static array, not a
  live feed. Will be swapped for a real public market data source
  (e.g. CoinGecko) in a later section.
- `src/app/page.tsx` updated to render `<Navbar />` + `<Hero />`.

## Section 3 — added
- `src/components/landing/proof-toast.tsx` — floating bottom-left toast that
  cycles through simulated activity events. **Mock data**, pulled from a
  static array in `src/lib/mock-proof-events.ts` — and the toast itself is
  labeled "Simulated activity" in the UI so it's transparent to visitors,
  not implying real live user transactions.
- `src/components/landing/tradingview-ticker.tsx` — official TradingView
  Ticker Tape widget embed. **Real, live public market data** (not mock) —
  pulled directly from TradingView.
- `src/components/landing/tradingview-heatmap.tsx` — official TradingView
  Crypto Coins Heatmap widget embed. Also real, live data.
- `src/components/landing/markets-section.tsx` — section wrapper around the
  heatmap with heading copy and scroll-triggered entrance animation.
- `src/components/landing/security-section.tsx` — 6-card grid describing
  the security architecture (HTTP-only cookies, route guarding, KYC gating,
  etc.), staggered scroll-in animations.
- `src/app/page.tsx` updated to compose all landing sections.

## Section 4 — added
- `.env.local.example` — copy to `.env.local` and fill in your Supabase
  project URL + anon key (Supabase dashboard → Settings → API).
- `src/lib/supabase/client.ts` — browser Supabase client.
- `src/lib/supabase/server.ts` — server Supabase client for Server
  Components/Actions, using HTTP-only cookies (never localStorage).
- `src/lib/supabase/middleware.ts` + `src/middleware.ts` — the route guard
  "bouncer": refreshes the session and redirects unauthenticated users away
  from `/dashboard/*`, and redirects logged-in users away from
  `/login` / `/register`.
- `src/lib/validations/auth.ts` — Zod schemas for login/register.
- `src/lib/actions/auth.ts` — Server Actions: `loginAction`,
  `registerAction`, `logoutAction`, all using Supabase Auth directly
  server-side.
- `src/components/auth/*` — `AuthShell`, `FormField`, `LoginForm`,
  `RegisterForm` (React Hook Form + Zod for client-side validation, calling
  the Server Actions on submit).
- `src/app/login/page.tsx`, `src/app/register/page.tsx` — auth pages.
- `src/app/dashboard/page.tsx` — **temporary placeholder** just to prove
  the auth flow + middleware guard work end-to-end. The real dashboard
  layout/sidebar/portfolio cards are built in Section 5.

### Before testing this section
1. Create a free project at https://supabase.com
2. Copy `.env.local.example` to `.env.local` and fill in your project URL
   + anon key.
3. In Supabase Auth settings, you can disable "Confirm email" while
   testing locally so signup logs you straight in.

## Section 5 — added
### New files
- `supabase/001_accounts_table.sql` — **run this in your Supabase SQL
  Editor.** Creates the `accounts` table (balance, profit, deposits,
  withdrawals, KYC status) with row-level security, and a trigger that
  auto-creates a demo account row with starter mock balances whenever
  someone signs up.
- `src/lib/format-currency.ts` — currency formatting using
  `Intl.NumberFormat`, reading exact decimal values from Postgres
  `numeric` columns (no float math on money).
- `src/lib/queries/account.ts` — server-side fetch of the current user's
  account row.
- `src/components/dashboard/sidebar.tsx` — glassmorphic left sidebar with
  animated active-route indicator, mobile slide-in drawer.
- `src/components/dashboard/live-price-stream.tsx` — polls CoinGecko's
  free public API every 30s for **real, live** BTC/ETH prices (not mock).
- `src/components/dashboard/header.tsx` — sticky header with the live
  price stream, theme toggle, and a dismissible KYC alert banner.
- `src/components/dashboard/dashboard-shell.tsx` — client component tying
  sidebar + header together and managing the mobile menu state.
- `src/components/dashboard/portfolio-cards.tsx` — the four metric cards
  (Balance, Profit, Deposits, Withdrawals) reading from the `accounts`
  table.
- `src/app/dashboard/layout.tsx` — fetches the user + account server-side,
  wraps all `/dashboard/*` pages in `DashboardShell`.

### Replaced files
- `src/app/dashboard/page.tsx` — **replace entirely.** The Section 4
  placeholder ("You're authenticated 🎉") is now the real Overview page
  with the portfolio cards. If you unzip this over your existing project,
  it overwrites automatically — just confirmed here since you asked.

### Before testing this section
1. Run `supabase/001_accounts_table.sql` in your Supabase project's SQL
   Editor (Database → SQL Editor → New query → paste → Run).
2. If you already created a test user in Section 4 *before* running this
   migration, that user won't have an account row (the trigger only fires
   on new sign-ups). Easiest fix: delete that test user in Supabase Auth
   and sign up again — or manually insert a row for them.

## Section 6 — added
### New files
- `supabase/002_orders_table.sql` — ⚠️ **run this in your Supabase SQL
  Editor** (after `001_accounts_table.sql`). Creates the `orders` table
  with row-level security.
- `src/lib/money.ts` — cent-precise currency arithmetic helpers to avoid
  floating-point drift on money values.
- `src/lib/tradable-symbols.ts` — shared list of tradable symbols (TV
  chart format + Binance stream name) used by the chart, ticker, and
  selector.
- `src/lib/validations/trading.ts` — Zod schema for order input.
- `src/lib/actions/trading.ts` — `placeOrderAction` Server Action:
  validates the order, checks sufficient balance, generates a randomized
  **simulated** P&L server-side, updates `accounts`, and logs the order to
  `orders`. Demo-only — no real broker/exchange is connected, no real
  trade executes and no real money moves.
- `src/components/trading/tradingview-advanced-chart.tsx` — TradingView's
  official Advanced Real-Time Chart widget. **Real, live public market
  data.**
- `src/components/trading/live-ticker-feed.tsx` — connects directly to
  **Binance's public WebSocket trade stream** for BTC, ETH, and SOL —
  genuine live trade-by-trade data, no API key needed. EUR/USD doesn't
  have a Binance feed, so it shows a static fallback message instead of
  faking one.
- `src/components/trading/symbol-selector.tsx` — pill selector for
  switching the active trading symbol.
- `src/components/trading/order-panel.tsx` — Buy/Sell toggle, amount
  input (validated against available balance), transaction speed
  selector, and submit button wired to `placeOrderAction`.
- `src/components/trading/trading-workspace.tsx` — client wrapper sharing
  the selected symbol between the chart, ticker feed, and order panel.

### Replaced files
- `src/app/dashboard/trading/page.tsx` — was a 404 (route didn't exist
  yet); now the real Trading Terminal page. Fetches the account balance
  server-side and renders `TradingWorkspace`.

### Before testing this section
Run `supabase/002_orders_table.sql` in the Supabase SQL Editor (in
addition to `001_accounts_table.sql` from Section 5, if you haven't
already).

## Section 7 — added
### New files
- `supabase/003_kyc_storage.sql` — ⚠️ **run this in your Supabase SQL
  Editor** (after 001 and 002). Creates a private `kyc-documents` Storage
  bucket with RLS policies scoping each user to their own folder
  (`${user_id}/...`).
- `supabase/004_kyc_submissions_table.sql` — ⚠️ **run this too, after
  003.** Creates a `kyc_submissions` audit table (document type, storage
  path, review status, timestamp) — separate from the live status flag on
  `accounts.kyc_status`.
- `src/lib/validations/kyc.ts` — Zod schema for the upload (document type
  + file type/size validation, 8MB max, JPG/PNG/WEBP/PDF).
- `src/lib/actions/kyc.ts` — `submitKycAction`: uploads the file to
  Storage, logs a `kyc_submissions` row, and flips
  `accounts.kyc_status` to `"pending"`. No real identity-verification
  vendor is connected — this is a demo flow; a real deployment would hand
  the document off to a provider like Persona or Onfido for actual review.
- `src/components/kyc/kyc-status-badge.tsx` — colored status pill
  (Unverified / Pending Review / Verified).
- `src/components/kyc/kyc-upload-form.tsx` — document type selector +
  drag-and-drop file upload with preview and validation feedback.
- `src/app/dashboard/kyc/page.tsx` — renders the upload form when
  unverified, a "your document is under review" state when pending, and a
  confirmation state when verified.

### Before testing this section
Run `supabase/003_kyc_storage.sql` then `supabase/004_kyc_submissions_table.sql`
in your Supabase SQL Editor, in addition to 001 and 002 from earlier
sections.

### Note on "verified" status
There's no admin review UI yet, so in this demo the only way to move an
account from `pending` to `verified` is manually, via the Supabase Table
Editor (update `accounts.kyc_status` for a given `user_id`). A future
section could add a simple admin approval view if you want one.

## Next: Section 8
Deposit and withdrawal pages (`/dashboard/deposit`, `/dashboard/withdraw`)
— gated behind `kyc_status === "verified"`, with mock balance updates and
a shared transaction history table/component.
