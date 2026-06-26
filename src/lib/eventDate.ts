/**
 * Format helpers for events.
 *
 * Frontmatter dates are parsed by zod to native `Date`. We can't see the
 * original string after parsing, so we infer "all-day" vs "has time" from
 * the parsed value: YYYY-MM-DD parses to UTC midnight, so any datetime
 * whose UTC hour/minute/second are all zero is treated as all-day.
 * (A real event scheduled at exactly 00:00 UTC is vanishingly rare.)
 */

export function hasTime(d: Date): boolean {
  return d.getUTCHours() !== 0 || d.getUTCMinutes() !== 0 || d.getUTCSeconds() !== 0;
}

export function formatEventDate(d: Date, withTime: boolean): string {
  const dateOpts: Intl.DateTimeFormatOptions = withTime
    ? { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    : { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  const datePart = d.toLocaleDateString('en-US', dateOpts);
  if (!withTime) return datePart;
  const timePart = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
  return `${datePart} · ${timePart}`;
}

export function formatEventDateShort(d: Date, withTime: boolean): string {
  const dateOpts: Intl.DateTimeFormatOptions = withTime
    ? { month: 'short', day: 'numeric', year: 'numeric' }
    : { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
  const datePart = d.toLocaleDateString('en-US', dateOpts);
  if (!withTime) return datePart;
  const timePart = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${datePart} · ${timePart}`;
}

/** True if the event has already ended (or started, if no endDate). */
export function isPast(start: Date, end?: Date): boolean {
  const reference = end ?? start;
  return reference.getTime() < Date.now();
}
