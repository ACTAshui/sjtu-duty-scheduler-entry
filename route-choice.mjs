export function preferredRoute(country, timeZone) {
  if (country) return country.toUpperCase() === 'CN' ? 'edgeone' : 'cloudflare';
  return timeZone === 'Asia/Shanghai' ? 'edgeone' : 'cloudflare';
}

export function isFreshTarget(updatedAt,now=new Date().toISOString()){
  const updated=Date.parse(updatedAt),current=Date.parse(now);
  return Number.isFinite(updated)&&Number.isFinite(current)&&current>=updated&&current-updated<150*60*1000;
}
