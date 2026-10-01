// Single source of truth for shop data used by the serverless API.
export const SHOP = {
  name: 'Century Cuts Barbershop',
  timeZone: 'America/Los_Angeles',
  bookingUrl: 'https://centurycutsbarberr.booksy.com',
  instagram: 'https://www.instagram.com/centurycutsbarbershop/',
  instagramDm: 'https://ig.me/m/centurycutsbarbershop',
  address: '13068 Century Blvd, Garden Grove, CA 92843',
};

// 0 = Sunday … 6 = Saturday. Times are "HH:MM" in shop local time.
export const HOURS = [
  { open: '10:00', close: '14:00' },
  { open: '10:00', close: '19:00' },
  { open: '10:00', close: '19:00' },
  { open: '10:00', close: '19:00' },
  { open: '10:00', close: '19:00' },
  { open: '10:00', close: '19:00' },
  { open: '10:00', close: '17:00' },
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const to12h = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
};

// Current weekday and minutes-since-midnight in the shop's time zone.
export function shopClock(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: SHOP.timeZone,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  return { day, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

export function openStatus(now = new Date()) {
  const { day, minutes } = shopClock(now);
  const today = HOURS[day];

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return {
      open: true,
      day,
      closesAt: to12h(today.close),
      message: `Open now · Closes ${to12h(today.close)}`,
    };
  }

  // Find the next opening (later today or a following day).
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    const h = HOURS[d];
    if (!h) continue;
    if (offset === 0 && minutes >= toMinutes(h.open)) continue;
    const when = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : DAYS[d];
    return {
      open: false,
      day,
      opensAt: to12h(h.open),
      opensDay: d,
      opensWhen: offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : 'day',
      message: `Closed · Opens ${when} at ${to12h(h.open)}`,
    };
  }
  return { open: false, day, message: 'Closed' };
}
