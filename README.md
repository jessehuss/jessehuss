# jessehuss.com

Personal site for Jesse Huss.

## Edit copy

Update `src/content/site.ts` — headline, bio, and project blurbs live there. Replace `public/images/avatar.jpg` to change the photo.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Cloudflare Pages project `jessehuss` (personal account). Production branch: `master`. Preview branches auto-deploy.

Required Pages env vars (preview **and** production):

| Name | Notes |
|---|---|
| `RESEND_API_KEY` | Secret — personal Resend key for jessehuss.com |
| `FROM_EMAIL` | e.g. `admin@jessehuss.com` |
| `TO_EMAIL` | Delivery inbox (not rendered in HTML) |

Contact form: `POST /api/contact` (Pages Function). Personal Gmail is never embedded in page HTML.
