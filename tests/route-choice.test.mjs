import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { preferredRoute } from '../route-choice.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cloudBaseUrl = 'https://sjtu-duty-scheduler-d1bu58a2846d-1476562505.ap-shanghai.app.tcloudbase.com/';
const read = (path) => readFileSync(join(root, path), 'utf8');

test('all networks use the stable CloudBase application', () => {
  assert.equal(preferredRoute('CN', 'UTC'), 'cloudbase');
  assert.equal(preferredRoute('US', 'America/New_York'), 'cloudbase');
  assert.equal(preferredRoute('', 'Asia/Shanghai'), 'cloudbase');
});

test('target manifest points at the stable CloudBase application', () => {
  const target = JSON.parse(read('target.json'));
  assert.deepEqual(target, { url: cloudBaseUrl, updatedAt: 'stable' });
});

test('entry page buttons and automatic redirect all use CloudBase', () => {
  const html = read('index.html');
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(links, [cloudBaseUrl, cloudBaseUrl]);
  assert.match(html, /location\.replace\(cloudBase\)/);
  assert.match(html, /国内稳定入口/);
  assert.match(html, /首次访问/);
  assert.match(html, /确定访问/);
  assert.match(html, /腾讯云免费默认域名/);
  assert.match(html, /setTimeout\([^,]+,\s*(?:[5-9]\d{3}|[1-9]\d{4,})\)/s);
  assert.doesNotMatch(html, /VPN|梯子/i);
});

test('Pages workflow publishes target.json without an EdgeOne refresh schedule', () => {
  const workflow = read('.github/workflows/refresh-entry.yml');
  assert.match(workflow, /cp index\.html route-choice\.mjs target\.json pages-public\//);
  assert.doesNotMatch(workflow, /^\s*schedule:/m);
  assert.doesNotMatch(workflow, /write-target|EdgeOne|eo_token/i);
});

test('published entry sources do not reference retired primary routes', () => {
  for (const path of ['index.html', 'target.json', 'route-choice.mjs', 'README.md', '.github/workflows/refresh-entry.yml']) {
    assert.doesNotMatch(read(path), /workers\.dev|edgeone\.cool|eo_token/i, path);
  }
});
