import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCalendar, FiCheckCircle, FiClock, FiPhone, FiUser, FiX } from 'react-icons/fi';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { site } from '../../data/content';

const FIELD =
  'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14.5px] text-chalk outline-none transition-all duration-300 placeholder:text-mute-2 focus:border-brand-cyan/60 focus:bg-white/[0.07]';
const LABEL = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.13em] text-mute-2';

const emptyForm = (doctor) => ({
  name: '',
  contactNo: '',
  patientId: '',
  problem: '',
  doctorName: doctor,
  appointmentDate: new Date().toISOString().split('T')[0],
  timeSlot: 'Morning',
});

export default function BookingModal({ isOpen, onClose, defaultDoctor = 'Dr. Nalluru Sasidhar' }) {
  const toast = useToast();
  const [patientType, setPatientType] = useState('new');
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState(emptyForm(defaultDoctor));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setFormData((f) => ({ ...f, doctorName: defaultDoctor }));
    client
      .get('/doctors')
      .then((res) => {
        const list = res.data?.doctors || [];
        setDoctors(list.length ? list : [{ name: 'Dr. Nalluru Sasidhar', qualification: 'M.D.S (OSM)' }]);
      })
      .catch(() => setDoctors([{ name: 'Dr. Nalluru Sasidhar', qualification: 'M.D.S (OSM)' }]));
  }, [isOpen, defaultDoctor]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const set = (k) => (e) => setFormData((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await client.post('/appointments', { ...formData, patientType });
      if (res.data?.success) {
        setResult(res.data.appointment);
        toast.success('Appointment booked successfully.');
      } else {
        toast.error(res.data?.message || 'Failed to book appointment.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error while booking. Please call the clinic.');
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setResult(null);
    setFormData(emptyForm(defaultDoctor));
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 py-8 sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0b0d13]/95 p-6 shadow-[0_50px_120px_-30px_rgba(0,0,0,1)] backdrop-blur-2xl md:p-8"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.35),transparent)]" />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-mute transition-colors hover:bg-white/10 hover:text-white"
            >
              <FiX size={18} />
            </button>

            {result ? (
              <div className="relative py-4 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-mint/15 text-brand-mint ring-1 ring-brand-mint/30">
                  <FiCheckCircle size={34} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">Appointment confirmed</h3>
                <p className="mt-2 text-[14px] text-mute">
                  Thank you, <span className="font-semibold text-chalk">{result.name}</span>. We have you on the list.
                </p>

                <dl className="my-7 space-y-3 rounded-2xl border border-white/[0.09] bg-white/[0.03] p-5 text-left text-[14px]">
                  {[
                    ['Patient ID', result.patientId],
                    ['Doctor', result.doctorName],
                    ['Date & slot', `${result.appointmentDate} · ${result.timeSlot}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4">
                      <dt className="text-mute-2">{k}</dt>
                      <dd className="font-medium text-white">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex gap-3">
                  <a
                    href={`tel:${site.phone}`}
                    className="glass inline-flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold text-chalk"
                  >
                    <FiPhone size={15} /> Call clinic
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="flex-1 rounded-full bg-brand-primary py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#3b9bff]"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-tight text-white">Book an appointment</h3>
                <p className="mt-1.5 text-[14px] text-mute">Priority treatment without the wait.</p>

                <div className="mt-6 flex rounded-full border border-white/[0.09] bg-white/[0.03] p-1">
                  {['new', 'existing'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPatientType(t)}
                      className={`relative flex-1 rounded-full py-2.5 text-[13.5px] font-semibold capitalize transition-colors duration-400 ${
                        patientType === t ? 'text-black' : 'text-mute hover:text-white'
                      }`}
                    >
                      {patientType === t && (
                        <motion.span
                          layoutId="patient-type"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{t} patient</span>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {patientType === 'existing' && (
                    <div>
                      <label className={LABEL} htmlFor="bk-pid">Patient ID</label>
                      <div className="relative">
                        <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute-2" size={15} />
                        <input
                          id="bk-pid"
                          required
                          placeholder="DUH-2026-1234"
                          value={formData.patientId}
                          onChange={set('patientId')}
                          className={`${FIELD} pl-11`}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={LABEL} htmlFor="bk-name">Full name *</label>
                      <input id="bk-name" required placeholder="Your name" value={formData.name} onChange={set('name')} className={FIELD} />
                    </div>
                    <div>
                      <label className={LABEL} htmlFor="bk-phone">Contact no. *</label>
                      <input id="bk-phone" type="tel" required placeholder="9440313066" value={formData.contactNo} onChange={set('contactNo')} className={FIELD} />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="bk-doc">Select doctor</label>
                    <select id="bk-doc" value={formData.doctorName} onChange={set('doctorName')} className={`${FIELD} appearance-none`}>
                      {doctors.map((d) => (
                        <option key={d._id || d.name} value={d.name} className="bg-[#0b0d13]">
                          {d.qualification ? `${d.name} — ${d.qualification}` : d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={LABEL} htmlFor="bk-date">Date *</label>
                      <div className="relative">
                        <FiCalendar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute-2" size={15} />
                        <input
                          id="bk-date"
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.appointmentDate}
                          onChange={set('appointmentDate')}
                          className={`${FIELD} pl-11`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL} htmlFor="bk-slot">Time slot *</label>
                      <div className="relative">
                        <FiClock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute-2" size={15} />
                        <select id="bk-slot" value={formData.timeSlot} onChange={set('timeSlot')} className={`${FIELD} appearance-none pl-11`}>
                          <option value="Morning" className="bg-[#0b0d13]">Morning · 09:00–13:00</option>
                          <option value="Afternoon" className="bg-[#0b0d13]">Afternoon · 13:00–17:00</option>
                          <option value="Evening" className="bg-[#0b0d13]">Evening · 17:00–21:00</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="bk-problem">Reason (optional)</label>
                    <textarea
                      id="bk-problem"
                      rows={2}
                      placeholder="Tooth pain, root canal, implant consultation…"
                      value={formData.problem}
                      onChange={set('problem')}
                      className={`${FIELD} resize-none`}
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                    <a
                      href={`tel:${site.phone}`}
                      className="glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold text-chalk"
                    >
                      <FiPhone size={15} /> Call now
                    </a>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 rounded-full bg-brand-primary px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_40px_-14px_rgba(10,132,255,1)] transition-all duration-500 hover:bg-[#3b9bff] disabled:opacity-50"
                    >
                      {loading ? 'Confirming…' : 'Book online'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
