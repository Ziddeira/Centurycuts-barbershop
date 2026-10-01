import { SHOP } from './_lib/shop.js';

// Messages are delivered by email through Resend (https://resend.com) when
// RESEND_API_KEY and CONTACT_TO_EMAIL are set in the Vercel project.
// Without them the endpoint answers 503 and the site falls back to an
// Instagram DM, so the form never silently drops a message.

const MAX = { name: 80, contact: 120, service: 80, message: 1500 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value, max) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function validate(body = {}) {
  const data = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.contact),
    service: clean(body.service, MAX.service),
    message: typeof body.message === 'string' ? body.message.trim().slice(0, MAX.message) : '',
  };
  const errors = {};
  if (data.name.length < 2) errors.name = 'Please tell us your name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email so we can reply.';
  if (data.message.length < 5) errors.message = 'Please write a short message.';
  return { data, errors };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  // Honeypot: real visitors never fill the hidden "website" field.
  if (body?.website) return res.status(200).json({ ok: true });

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) return res.status(422).json({ error: 'Invalid fields', errors });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return res.status(503).json({
      error: 'Contact form is not configured',
      fallback: SHOP.instagramDm,
    });
  }

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Service: ${data.service || '—'}`,
    '',
    data.message,
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || 'Century Cuts Website <onboarding@resend.dev>',
        to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
        reply_to: data.email,
        subject: `New message from ${data.name} — ${SHOP.name} website`,
        text,
        html: `<pre style="font:14px/1.5 system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
      }),
    });
    if (!r.ok) throw new Error(`Resend responded ${r.status}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact: delivery failed', err);
    return res.status(502).json({ error: 'Could not deliver message', fallback: SHOP.instagramDm });
  }
}
