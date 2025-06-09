// Simple script to check if required environment variables are set
// This is run before the build to prevent deployment without necessary env vars

const requiredEnvVars = [
  'DATABASE_URL', 
  'NEXTAUTH_URL', 
  'NEXTAUTH_SECRET',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

let missingVars = [];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    missingVars.push(envVar);
  }
});

if (missingVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: Missing required environment variables:');
  missingVars.forEach(variable => {
    console.error('\x1b[31m%s\x1b[0m', `  - ${variable}`);
  });
  console.error('\x1b[31m%s\x1b[0m', 'Please set these variables in your environment or in Vercel project settings.');
  
  // In development, we might want to continue anyway
  if (process.env.NODE_ENV === 'production') {
    process.exit(1); // Exit with error in production
  } else {
    console.warn('\x1b[33m%s\x1b[0m', 'Continuing anyway since not in production, but the app may not work correctly.');
  }
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ All required environment variables are set.');
}