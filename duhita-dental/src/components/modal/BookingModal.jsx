import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiPhone, FiCalendar, FiClock, FiUser, FiCheckCircle } from 'react-icons/fi';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';

export default function BookingModal({ isOpen, onClose, defaultDoctor = 'Dr. Nalluru Sasidhar' }) {
  const toast = useToast();
  const [patientType, setPatientType] = useState('new');
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    patientId: '',
    problem: '',
    doctorName: defaultDoctor,
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning',
  });
  const [loading, setLoading] = useState(false);
  const [bookedResult, setBookedResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch dynamic doctors list
      client
        .get('/doctors')
        .then((res) => {
          if (res.data.doctors && res.data.doctors.length > 0) {
            setDoctors(res.data.doctors);
          }
        })
        .catch(() => {
          // Fallback doctors list
          setDoctors([{ name: 'Dr. Nalluru Sasidhar', qualification: 'M.D.S (OSM)' }]);
        });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await client.post('/appointments', {
        ...formData,
        patientType,
      });

      if (res.data.success) {
        setBookedResult(res.data.appointment);
        toast.success('Appointment booked successfully!');
      } else {
        toast.error(res.data.message || 'Failed to book appointment.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error while booking. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setBookedResult(null);
    setFormData({
      name: '',
      contactNo: '',
      patientId: '',
      problem: '',
      doctorName: defaultDoctor,
      appointmentDate: new Date().toISOString().split('T')[0],
      timeSlot: 'Morning',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-2xl dark:bg-brand-dark-card dark:border dark:border-white/10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={resetAndClose}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>

            {bookedResult ? (
              <div className="text-center py-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <FiCheckCircle size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Appointment Confirmed!</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Thank you, <span className="font-semibold">{bookedResult.name}</span>. Your appointment has been recorded.
                </p>

                <div className="my-6 rounded-2xl bg-brand-light-card p-4 dark:bg-white/5 border border-brand-primary/20 text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Patient ID:</span>
                    <span className="font-mono font-bold text-brand-primary">{bookedResult.patientId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Doctor:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{bookedResult.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Date & Slot:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {bookedResult.appointmentDate} ({bookedResult.timeSlot})
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="tel:9440313066"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-white/10 py-3 text-sm font-semibold text-gray-800 dark:text-white hover:bg-gray-200"
                  >
                    <FiPhone size={16} /> Call Clinic
                  </a>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="flex-1 rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white hover:bg-brand-primary/90"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Book an Appointment</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fast priority treatment without long waiting times.
                  </p>
                </div>

                {/* Patient Type Tabs */}
                <div className="mb-6 flex rounded-2xl bg-gray-100 p-1 dark:bg-white/10">
                  <button
                    type="button"
                    onClick={() => setPatientType('new')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                      patientType === 'new'
                        ? 'bg-white text-brand-primary shadow-sm dark:bg-brand-dark-bg dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                    }`}
                  >
                    New Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientType('existing')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                      patientType === 'existing'
                        ? 'bg-white text-brand-primary shadow-sm dark:bg-brand-dark-bg dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                    }`}
                  >
                    Existing Patient
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {patientType === 'existing' && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Patient ID
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. DUH-2026-1234"
                          value={formData.patientId}
                          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-primary dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-primary dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Contact No. *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9440313066"
                        value={formData.contactNo}
                        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-primary dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                      Select Doctor
                    </label>
                    <select
                      value={formData.doctorName}
                      onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-card px-4 py-2.5 text-sm outline-none focus:border-brand-primary dark:text-white"
                    >
                      {doctors.length > 0 ? (
                        doctors.map((doc) => (
                          <option key={doc._id || doc.name} value={doc.name}>
                            {doc.name} ({doc.qualification})
                          </option>
                        ))
                      ) : (
                        <option value="Dr. Nalluru Sasidhar">Dr. Nalluru Sasidhar (M.D.S)</option>
                      )}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Appointment Date *
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.appointmentDate}
                          onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-primary dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Time Slot *
                      </label>
                      <div className="relative">
                        <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-card pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-primary dark:text-white"
                        >
                          <option value="Morning">Morning (09:00 AM - 01:00 PM)</option>
                          <option value="Afternoon">Afternoon (01:00 PM - 05:00 PM)</option>
                          <option value="Evening">Evening (05:00 PM - 09:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                      Dental Problem / Reason (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tooth pain, root canal, scaling, implant consultation..."
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-primary dark:text-white"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:9440313066"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-navy/15 dark:border-white/15 px-5 py-3 text-sm font-semibold text-brand-navy dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                    >
                      <FiPhone size={16} /> Call Now
                    </a>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 rounded-2xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                    >
                      {loading ? 'Confirming...' : 'Book Online'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
