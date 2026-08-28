export function preferredRoute(country, timeZone) {
  if (country) return country.toUpperCase() === 'CN' ? 'edgeone' : 'cloudflare';
  return timeZone === 'Asia/Shanghai' ? 'edgeone' : 'cloudflare';
}
