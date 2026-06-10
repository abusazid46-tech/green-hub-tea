# Supabase Setup

Green Hub Assam Tea does not need a separate backend server. The backend runs as Vercel serverless routes inside this Next.js app.

## 1. Create Supabase Project

Create a new Supabase project and copy:

- Project URL
- anon public key
- service role key

Keep the service role key private. Add it only to Vercel environment variables, never to browser code.

## 2. Create Tables

In Supabase SQL Editor, run:

```sql
-- paste the contents of supabase/schema.sql
```

Then optionally seed starter products:

```sql
-- paste the contents of supabase/seed.sql
```

## 3. Create Admin User

In Supabase Auth, create a user with email and password.

Set `ADMIN_EMAILS` to that email address in Vercel. For multiple admins, use comma-separated emails:

```bash
ADMIN_EMAILS=owner@example.com,manager@example.com
```

## 4. Vercel Environment Variables

Add these in Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
```

Redeploy after saving.

## 5. Admin Dashboard

Visit:

```text
/admin
```

Admin can:

- view saved inquiries
- update inquiry status
- add or update product records

The public site reads Supabase products when configured. If Supabase is not configured yet, it falls back to the original static products.
