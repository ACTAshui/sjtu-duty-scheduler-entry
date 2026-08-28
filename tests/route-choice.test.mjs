import test from 'node:test';
import assert from 'node:assert/strict';
import { preferredRoute } from '../route-choice.mjs';

test('mainland network prefers Tencent EdgeOne',()=>assert.equal(preferredRoute('CN','UTC'),'edgeone'));
test('overseas network prefers Cloudflare',()=>assert.equal(preferredRoute('US','Asia/Shanghai'),'cloudflare'));
test('Shanghai timezone is the fallback when IP lookup fails',()=>assert.equal(preferredRoute('', 'Asia/Shanghai'),'edgeone'));
