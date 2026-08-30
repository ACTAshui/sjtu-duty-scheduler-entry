export function preferredRoute(country, timeZone) {
  void country;
  void timeZone;
  return 'cloudflare';
}

export function isFreshTarget(updatedAt,now=new Date().toISOString()){
  const updated=Date.parse(updatedAt),current=Date.parse(now);
  return Number.isFinite(updated)&&Number.isFinite(current)&&current>=updated&&current-updated<150*60*1000;
}
