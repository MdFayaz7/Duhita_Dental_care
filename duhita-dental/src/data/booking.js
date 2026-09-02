export const IST_OFFSET_MINUTES = 330;
export const LEAD_MINUTES = 30;

export const TIME_SLOTS = [
  { id: 'Morning', label: 'Morning', start: 540, end: 780, display: '09:00 AM – 01:00 PM' },
  { id: 'Evening', label: 'Evening', start: 900, end: 1260, display: '03:00 PM – 09:00 PM' },
];

export function istNow(reference = new Date()) {
  const utc = reference.getTime() + reference.getTimezoneOffset() * 60000;
  const ist = new Date(utc + IST_OFFSET_MINUTES * 60000);
  const pad = (n) => String(n).padStart(2, '0');
  return {
    date: `${ist.getFullYear()}-${pad(ist.getMonth() + 1)}-${pad(ist.getDate())}`,
    minutes: ist.getHours() * 60 + ist.getMinutes(),
  };
}

export function addDays(dateString, days) {
  const d = new Date(`${dateString}T00:00:00`);
  d.setDate(d.getDate() + days);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isValidDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function availableSlots(dateString, reference = new Date()) {
  if (!isValidDateString(dateString)) return [];
  const now = istNow(reference);
  if (dateString > now.date) return TIME_SLOTS;
  if (dateString < now.date) return [];
  return TIME_SLOTS.filter((slot) => now.minutes < slot.end - LEAD_MINUTES);
}

export function earliestBookableDate(reference = new Date()) {
  const now = istNow(reference);
  return availableSlots(now.date, reference).length > 0 ? now.date : addDays(now.date, 1);
}
