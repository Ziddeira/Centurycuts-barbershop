import { HOURS, SHOP, openStatus } from './_lib/shop.js';

export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  return res.status(200).json({
    ...openStatus(),
    timeZone: SHOP.timeZone,
    hours: HOURS,
  });
}
