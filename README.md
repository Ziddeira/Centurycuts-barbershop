# Century Cuts Barbershop — website

Website for **Century Cuts Barbershop**, 13068 Century Blvd, Garden Grove, CA 92843.
*A Century in Every Cut.*

- Static, dependency-free frontend (HTML/CSS/JS) with an English / Spanish toggle
- Vercel serverless API (`/api`) for live open/closed status and the contact form
- Self-hosted fonts, SEO (`BarberShop` structured data), social share image, PWA manifest

## Structure

```
index.html              Single-page site
404.html                Not-found page
assets/css/             styles.css, fonts.css (self-hosted Google Fonts)
assets/js/main.js       Nav, i18n, open/closed badge, gallery lightbox, contact form
assets/img/             Logo, icons, shop and haircut photos
assets/fonts/           Bebas Neue, Inter, Yellowtail (SIL OFL)
api/status.js           GET  /api/status   → open now? closes/opens at…
api/contact.js          POST /api/contact  → emails the shop through Resend
api/_lib/shop.js        Hours, links and time-zone logic (America/Los_Angeles)
scripts/dev.mjs         Local server that mimics Vercel (static + /api)
tests/                  node:test tests for the API
```

## Run locally

```bash
npm run dev     # http://localhost:3000
npm test
```

No `npm install` is needed — there are no dependencies.

## Deploy to Vercel

1. Go to <https://vercel.com/new> and import the GitHub repo `ziddeira/centurycuts-barbershop`.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Click **Deploy**. Every push to the selected branch redeploys automatically.

Or from a terminal: `npx vercel --prod`.

### Contact form email (optional)

The form delivers messages by email through [Resend](https://resend.com). In the
Vercel project go to **Settings → Environment Variables** and add:

| Variable             | Example                                        |
| -------------------- | ---------------------------------------------- |
| `RESEND_API_KEY`     | `re_xxxxxxxx`                                  |
| `CONTACT_TO_EMAIL`   | the shop's inbox (comma-separate several)      |
| `CONTACT_FROM_EMAIL` | `Century Cuts <hello@your-domain.com>` (needs a domain verified in Resend; defaults to Resend's test sender) |

Until these are set, `/api/contact` answers `503` and the site copies the visitor's
message and points them to the shop's Instagram DM, so no message is lost silently.

## Updating content

- **Hours:** `api/_lib/shop.js` (`HOURS`), the hours table in `index.html`, the
  fallback `HOURS` in `assets/js/main.js` and the JSON-LD block in `index.html`.
- **Prices / services:** the `#services` section of `index.html` (+ the Spanish
  strings in `assets/js/main.js`).
- **Logo:** replace `assets/img/logo-century-cuts.png` / `.webp` (square, transparent,
  white artwork works best on the dark theme).
