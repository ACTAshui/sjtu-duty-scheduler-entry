import test from 'node:test';
import assert from 'node:assert/strict';
import { isFreshTarget, preferredRoute } from '../route-choice.mjs';

test('mainland network prefers Tencent EdgeOne',()=>assert.equal(preferredRoute('CN','UTC'),'edgeone'));
test('overseas network prefers Cloudflare',()=>assert.equal(preferredRoute('US','Asia/Shanghai'),'cloudflare'));
test('Shanghai timezone is the fallback when IP lookup fails',()=>assert.equal(preferredRoute('', 'Asia/Shanghai'),'edgeone'));
test('EdgeOne target is fresh for 150 minutes only',()=>{
  assert.equal(isFreshTarget('2026-08-30T00:00:00Z','2026-08-30T02:29:00Z'),true);
  assert.equal(isFreshTarget('2026-08-30T00:00:00Z','2026-08-30T02:31:00Z'),false);
  assert.equal(isFreshTarget('invalid','2026-08-30T02:31:00Z'),false);
});
