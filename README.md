# Green Hub Assam Tea

A premium ecommerce and B2B export website for Green Hub Assam Tea, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Hook Form, Zod, Shadcn-style UI components, and Lucide icons.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/home`.

## Production

```bash
npm run build
npm run start
```

The project is Vercel-ready and includes App Router metadata, structured data, sample product data, ecommerce pages, B2B inquiry flows, and policy pages.

## Supabase Backend

This site can run without a separate Render server. Vercel hosts the Next.js frontend and serverless API routes, while Supabase provides the database and admin authentication.

1. Create a Supabase project.
2. Open Supabase SQL Editor and run `supabase/schema.sql`.
3. Optionally run `supabase/seed.sql` to add starter products.
4. In Supabase Auth, create an admin user with email/password.
5. Add these variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=your-admin-email@example.com
```

6. Redeploy Vercel.
7. Visit `/admin` and sign in with the Supabase admin user.

Public inquiry forms save to Supabase through `/api/inquiries` and still open WhatsApp/email for fast follow-up. Products are read from Supabase when configured, with the original static product data used as a fallback.
