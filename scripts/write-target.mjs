import { readFileSync, writeFileSync } from 'node:fs';

const lines = readFileSync('deploy.log','utf8').split(/\r?\n/).reverse();
let deployment;
for (const line of lines) {
  const start = line.indexOf('{"status"');
  if (start < 0) continue;
  try {
    deployment = JSON.parse(line.slice(start));
    break;
  } catch {}
}
if (!deployment?.url) throw new Error('EdgeOne deployment URL was not found');
writeFileSync('target.json', JSON.stringify({url:deployment.url,updatedAt:new Date().toISOString()}));
