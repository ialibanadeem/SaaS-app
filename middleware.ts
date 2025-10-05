import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
      // Optional: redirect unauthenticated users automatically
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],

  matcher: [
    // Match all routes except Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:jpg|png|gif|ico|css|js|svg|map)$).*)',
    
    // Explicitly match API and tRPC routes (no data route wrapping)
    '/api/(.*)',
    '/trpc/(.*)',
  ],
};
