const CLOUDFLARE_ORIGIN = "https://sjtu-duty-scheduler.sjtu-duty-scheduler.workers.dev";

export async function middleware(context) {
  const { request, next, rewrite } = context;
  const incoming = new URL(request.url);
  if (!incoming.pathname.startsWith("/api/")) return next();
  const target = new URL(incoming.pathname + incoming.search, CLOUDFLARE_ORIGIN);
  return rewrite(target.toString());
}

export const config = {
  matcher: ["/api/:path*"],
};
