# Chronovault

## Deployment on Vercel

### Prerequisites
- Node.js 18.17.0 or later
- PostgreSQL database (Supabase)

### Environment Variables
Set the following environment variables in your Vercel project settings:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection URL to your Supabase database |
| `NEXTAUTH_URL` | Set to `https://chronovault-app.vercel.app/` |
| `NEXTAUTH_SECRET` | Secret key for NextAuth |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

### Important Security Note
- Never commit actual credential values to your repository
- Use Vercel's environment variable settings to securely store these values
- Rotate credentials regularly for security

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in the Vercel dashboard
3. Deploy with the following settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Troubleshooting

If you encounter issues during deployment:

1. Check Vercel build logs for specific error messages
2. Verify all environment variables are set correctly
3. Ensure your Supabase database is accessible from Vercel's servers
4. Check if your Prisma schema matches your database schema

## Local Development

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.