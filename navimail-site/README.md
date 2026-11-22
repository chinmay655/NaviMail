# NaviMail by Navicent — React single-page website

A responsive, modern SaaS landing page concept built with React 18, Vite and CSS, ready for static hosting on Hostinger.

## Local setup

1. Install Node.js 20.19+ or 22.12+ (suitable for Vite 6).
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL shown.
4. Run `npm run build` to generate the `dist/` directory.

## Hostinger deployment

1. Build locally using `npm run build`.
2. In Hostinger File Manager, open the website's `public_html` directory.
3. Upload the **contents** of `dist/` (not the source folder) into `public_html`.
4. Configure your domain/subdomain to use the Hostinger website. In Cloudflare DNS, point the proxied record at the correct Hostinger destination, using the values from your Hostinger panel.
5. Ensure a valid certificate exists on Hostinger, then use Cloudflare SSL/TLS Full (strict).
6. Test the live website on desktop and mobile.

## Before publishing (important)

- In `src/main.jsx`, set `CONFIG.contactEmail` to the **verified** NaviMail sales/demo email. Until then the form shows a setup message and does not send data.
- The form uses a `mailto:` draft, **not** a backend. A user must send the prepared email from their email client. For reliable lead capture, connect an approved form service or server endpoint with spam protection and privacy notice.
- Replace the concept product interface with approved actual screenshots. The current inbox preview is illustrative only.
- Confirm product feature availability, security/compliance claims, support, domain/migration capabilities, and any pricing before publication.
- Add real privacy policy / terms links and verified contact details before launch.
- No customer logos, fake testimonials or unsupported statistics are included.
- Update domain, favicon and brand assets when finalized.

## Structure

- `src/main.jsx` — all sections and React interactions
- `src/style.css` — responsive styling
- `index.html` — SEO title and meta description
- `public/favicon.svg` — temporary NaviMail mark

## Notes

No backend or database is needed for the static landing page. Hostinger serves the compiled React assets; Cloudflare provides the public DNS/CDN/proxy when configured. No second CDN is required.
