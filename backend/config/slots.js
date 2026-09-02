export const IST_OFFSET_MINUTES = 330;

export const LEAD_MINUTES = 30;

export const TIME_SLOTS = [
  { id: 'Morning', label: 'Morning', start: 9 * 60, end: 13 * 60, display: '09:00 AM – 01:00 PM' },
  { id: 'Evening', label: 'Evening', start: 15 * 60, end: 21 * 60, display: '03:00 PM – 09:00 PM' },
];

export const SLOT_IDS = TIME_SLOTS.map((s) => s.id);

export const LEGACY_SLOT_IDS = ['Afternoon'];

export function istNow(reference = new Date()) {
  const utc = reference.getTime() + reference.getTimezoneOffset() * 60000;
  const ist = new Date(utc + IST_OFFSET_MINUTES * 60000);
  const pad = (n) => String(n).padStart(2, '0');
  return {
    date: `${ist.getFullYear()}-${pad(ist.getMonth() + 1)}-${pad(ist.getDate())}`,
    minutes: ist.getHours() * 60 + ist.getMinutes(),
  };
}

export function isValidDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

export function availableSlots(dateString, reference = new Date()) {
  const now = istNow(reference);
  if (dateString > now.date) return TIME_SLOTS;
  if (dateString < now.date) return [];
  return TIME_SLOTS.filter((slot) => now.minutes < slot.end - LEAD_MINUTES);
}

export function validateBooking(dateString, slotId, reference = new Date()) {
  if (!isValidDateString(dateString)) {
    return { ok: false, message: 'Please provide a valid appointment date.' };
  }
  const now = istNow(reference);
  if (dateString < now.date) {
    return { ok: false, message: 'Appointments cannot be booked for a past date.' };
  }
  if (!SLOT_IDS.includes(slotId)) {
    return { ok: false, message: `Time slot must be one of: ${SLOT_IDS.join(', ')}.` };
  }
  const open = availableSlots(dateString, reference);
  if (!open.some((slot) => slot.id === slotId)) {
    return { ok: false, message: 'That time slot has already passed for today. Please pick a later slot or another day.' };
  }
  return { ok: true };
}
