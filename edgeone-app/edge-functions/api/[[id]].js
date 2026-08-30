const CLOUDFLARE_ORIGIN = "https://sjtu-duty-scheduler.sjtu-duty-scheduler.workers.dev";

export async function onRequest({ request }) {
  const incoming = new URL(request.url);
  const target = new URL(incoming.pathname + incoming.search, CLOUDFLARE_ORIGIN);
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("origin", CLOUDFLARE_ORIGIN);
  headers.set("x-forwarded-host", incoming.host);

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual",
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("x-sjtu-duty-edge", "edgeone");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}
