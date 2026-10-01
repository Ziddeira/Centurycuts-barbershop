import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openStatus } from '../api/_lib/shop.js';
import contact, { validate } from '../api/contact.js';

// 2026-10-01 is a Thursday. PDT = UTC-7.
const at = (iso) => new Date(iso);

test('open on a weekday afternoon', () => {
  const s = openStatus(at('2026-10-01T22:00:00Z')); // Thu 3:00 PM PDT
  assert.equal(s.open, true);
  assert.equal(s.closesAt, '7 PM');
  assert.equal(s.day, 4);
});

test('closed before opening, opens today', () => {
  const s = openStatus(at('2026-10-01T15:30:00Z')); // Thu 8:30 AM PDT
  assert.equal(s.open, false);
  assert.equal(s.opensWhen, 'today');
  assert.equal(s.opensAt, '10 AM');
});

test('closing time is exclusive and rolls to tomorrow', () => {
  const s = openStatus(at('2026-10-02T02:00:00Z')); // Thu 7:00 PM PDT
  assert.equal(s.open, false);
  assert.equal(s.opensWhen, 'tomorrow');
});

test('Sunday closes at 2 PM', () => {
  assert.equal(openStatus(at('2026-10-04T20:30:00Z')).open, true); // Sun 1:30 PM
  assert.equal(openStatus(at('2026-10-04T21:30:00Z')).open, false); // Sun 2:30 PM
});

test('validate rejects bad input and accepts good input', () => {
  assert.deepEqual(Object.keys(validate({}).errors).sort(), ['email', 'message', 'name']);
  const ok = validate({ name: 'Ana', email: 'ana@example.com', message: 'Need a fade Saturday' });
  assert.deepEqual(ok.errors, {});
});

function mockRes() {
  const res = { headers: {}, statusCode: 200, body: undefined };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  return res;
}

test('contact returns 503 with Instagram fallback when email is not configured', async () => {
  delete process.env.RESEND_API_KEY;
  const res = mockRes();
  await contact({ method: 'POST', body: { name: 'Ana', email: 'ana@example.com', message: 'Hello there' } }, res);
  assert.equal(res.statusCode, 503);
  assert.match(res.body.fallback, /ig\.me/);
});

test('contact rejects GET and invalid payloads', async () => {
  const r1 = mockRes();
  await contact({ method: 'GET' }, r1);
  assert.equal(r1.statusCode, 405);
  const r2 = mockRes();
  await contact({ method: 'POST', body: { name: 'A', email: 'nope', message: '' } }, r2);
  assert.equal(r2.statusCode, 422);
});

test('contact honeypot silently accepts bots', async () => {
  const res = mockRes();
  await contact({ method: 'POST', body: { website: 'spam.example' } }, res);
  assert.equal(res.statusCode, 200);
});
