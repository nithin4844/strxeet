# STRXEET — Setup & Deployment Guide

## Prerequisites

Install Node.js (v18+): https://nodejs.org

## Local Development

```bash
cd strxeet
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel (Recommended — Free)

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub + Vercel
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project
3. Import your repo → Deploy (zero config needed)

## Deploy to Netlify

```bash
npm run build
# Upload the `.next` folder to Netlify or use netlify-cli
```

## Custom Domain

After deploying to Vercel:
1. Go to your project → Settings → Domains
2. Add your custom domain (e.g. strxeet.com)
3. Update DNS records as instructed

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Home page
│   ├── shop/         # Shop/browse page
│   ├── product/[id]/ # Product detail page
│   ├── cart/         # Cart page
│   ├── checkout/     # Checkout flow
│   ├── about/        # About page
│   ├── collections/  # Collections page
│   └── wishlist/     # Wishlist page
├── components/       # Reusable UI components
├── data/products.ts  # Product catalog (edit to add products)
├── store/            # Zustand state (cart, wishlist)
└── types/            # TypeScript types
```

## Adding Products

Edit `src/data/products.ts` to add/modify products. Each product needs:
- `id` — unique string
- `name`, `price`, `images[]`
- `category` — tops | bottoms | outerwear | sets
- `sizes[]`, `colors[]`

## Payment Integration

For real payments, replace the demo checkout with:
- **Razorpay** (India): https://razorpay.com/docs
- **Stripe**: https://stripe.com/docs

Add your API keys to `.env.local`:
```
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
```
