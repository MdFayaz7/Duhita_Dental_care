import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiUserCheck,
  FiFileText,
  FiImage,
  FiLogOut,
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiGrid,
  FiClock,
  FiArrowUp,
  FiArrowDown,
  FiCopy,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import client, { resolveFileUrl } from '../api/client';

export default function AdminDashboardPage() {
  const { admin, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('appointments'); // 'overview' | 'appointments' | 'doctors' | 'research' | 'hospitalGallery' | 'campGallery'

  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [appointmentDateFilter, setAppointmentDateFilter] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState('All');
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  // Schedule state
  const [scheduleList, setScheduleList] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({
    patientName: '',
    patientId: '',
    contactNo: '',
    doctorName: 'Dr. Nalluru Sasidhar',
    date: appointmentDateFilter,
    timeInterval: '09:00 AM - 09:30 AM',
    status: 'Scheduled',
    notes: '',
  });

  // Doctors state
  const [doctors, setDoctors] = useState([]);
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [doctorForm, setDoctorForm] = useState({ name: '', qualification: '', specialization: '', experienceYears: 10, highlights: '', image: '', file: null });

  // Research state
  const [researchList, setResearchList] = useState([]);
  const [researchModalOpen, setResearchModalOpen] = useState(false);
  const [editingResearch, setEditingResearch] = useState(null);
  const [researchForm, setResearchForm] = useState({ title: '', description: '', authors: '', category: 'Endodontics', pdfUrl: '', coverImageUrl: '', pdfFile: null, coverFile: null });

  // Gallery states
  const [hospitalGallery, setHospitalGallery] = useState([]);
  const [hospitalGalleryModalOpen, setHospitalGalleryModalOpen] = useState(false);
  const [hospitalForm, setHospitalForm] = useState({ title: '', category: 'Hospital', imageUrl: '', file: null });

  const [campGallery, setCampGallery] = useState([]);
  const [campGalleryModalOpen, setCampGalleryModalOpen] = useState(false);
  const [campForm, setCampForm] = useState({ title: '', location: 'Vijayawada', date: '', imageUrl: '', file: null });

  // Confirm delete modal state
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: '', id: '', title: '' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Sync date filter to schedule form
  useEffect(() => {
    setScheduleForm((prev) => ({ ...prev, date: appointmentDateFilter }));
  }, [appointmentDateFilter]);

  // Load initial data
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
      fetchSchedule();
      fetchDoctors();
      fetchResearch();
      fetchGalleries();
    }
  }, [isAuthenticated, appointmentDateFilter, appointmentStatusFilter, appointmentSearch]);

  // Fetch functions
  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const queryParams = new URLSearchParams();
      if (appointmentDateFilter) queryParams.append('date', appointmentDateFilter);
      if (appointmentStatusFilter && appointmentStatusFilter !== 'All') queryParams.append('status', appointmentStatusFilter);
      if (appointmentSearch) queryParams.append('search', appointmentSearch);

      const res = await client.get(`/appointments?${queryParams.toString()}`);
      if (res.data.success) {
        setAppointments(res.data.appointments);
      }
    } catch (err) {} finally {
      setLoadingAppointments(false);
    }
  };

  const fetchSchedule = async () => {
    setLoadingSchedule(true);
    try {
      const res = await client.get(`/schedule?date=${appointmentDateFilter}`);
      if (res.data.success) {
        setScheduleList(res.data.schedule);
      }
    } catch (err) {} finally {
      setLoadingSchedule(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await client.get('/doctors');
      if (res.data.success) setDoctors(res.data.doctors);
    } catch (err) {}
  };

  const fetchResearch = async () => {
    try {
      const res = await client.get('/research');
      if (res.data.success) setResearchList(res.data.research);
    } catch (err) {}
  };

  const fetchGalleries = async () => {
    try {
      const resH = await client.get('/gallery/hospital');
      if (resH.data.success) setHospitalGallery(resH.data.images);
      const resC = await client.get('/gallery/camp');
      if (resC.data.success) setCampGallery(resC.data.images);
    } catch (err) {}
  };

  // Appointment Status Updater
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await client.put(`/appointments/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Appointment status updated to ${newStatus}`);
        fetchAppointments();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  // Copy Appointments to Schedule
  const handleCopyAppointmentsToSchedule = async () => {
    try {
      const res = await client.post('/schedule/copy-appointments', { date: appointmentDateFilter });
      if (res.data.success) {
        toast.success(res.data.message || 'Appointments copied to Schedule');
        fetchSchedule();
      }
    } catch (err) {
      toast.error('Failed to copy appointments to schedule');
    }
  };

  // Priority Maker - Move Up / Down
  const handleReorderSchedule = async (id, direction) => {
    try {
      const res = await client.put(`/schedule/${id}/reorder`, { direction });
      if (res.data.success) {
        setScheduleList(res.data.schedule);
      }
    } catch (err) {
      toast.error('Failed to reorder schedule');
    }
  };

  // Schedule Form Submit (Add / Edit)
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSchedule) {
        await client.put(`/schedule/${editingSchedule._id}`, scheduleForm);
        toast.success('Schedule entry updated');
      } else {
        await client.post('/schedule', scheduleForm);
        toast.success('Schedule entry added');
      }
      fetchSchedule();
      setScheduleModalOpen(false);
      setEditingSchedule(null);
    } catch (err) {
      toast.error('Failed to save schedule entry');
    }
  };

  // Delete Handler
  const executeDelete = async () => {
    const { type, id } = deleteConfirm;
    try {
      if (type === 'appointment') {
        await client.delete(`/appointments/${id}`);
        fetchAppointments();
      } else if (type === 'schedule') {
        await client.delete(`/schedule/${id}`);
        fetchSchedule();
      } else if (type === 'doctor') {
        await client.delete(`/doctors/${id}`);
        fetchDoctors();
      } else if (type === 'research') {
        await client.delete(`/research/${id}`);
        fetchResearch();
      } else if (type === 'hospitalGallery') {
        await client.delete(`/gallery/hospital/${id}`);
        fetchGalleries();
      } else if (type === 'campGallery') {
        await client.delete(`/gallery/camp/${id}`);
        fetchGalleries();
      }
      toast.success('Deleted successfully');
    } catch (err) {
      toast.error('Failed to delete item');
    } finally {
      setDeleteConfirm({ open: false, type: '', id: '', title: '' });
    }
  };

  // Doctor Form Submit
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', doctorForm.name);
    data.append('qualification', doctorForm.qualification);
    data.append('specialization', doctorForm.specialization);
    data.append('experienceYears', doctorForm.experienceYears);
    data.append('highlights', doctorForm.highlights);
    if (doctorForm.file) {
      data.append('image', doctorForm.file);
    } else if (doctorForm.image) {
      data.append('image', doctorForm.image);
    }

    try {
      if (editingDoctor) {
        await client.put(`/doctors/${editingDoctor._id}`, data);
        toast.success('Doctor updated successfully');
      } else {
        await client.post('/doctors', data);
        toast.success('Doctor added successfully');
      }
      fetchDoctors();
      setDoctorModalOpen(false);
      setEditingDoctor(null);
      setDoctorForm({ name: '', qualification: '', specialization: '', experienceYears: 10, highlights: '', image: '', file: null });
    } catch (err) {
      toast.error('Failed to save doctor details');
    }
  };

  // Research Form Submit
  const handleResearchSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', researchForm.title);
    data.append('description', researchForm.description);
    data.append('authors', researchForm.authors);
    data.append('category', researchForm.category);
    if (researchForm.pdfFile) data.append('pdf', researchForm.pdfFile);
    if (researchForm.coverFile) data.append('cover', researchForm.coverFile);

    try {
      if (editingResearch) {
        await client.put(`/research/${editingResearch._id}`, data);
        toast.success('Research paper updated');
      } else {
        await client.post('/research', data);
        toast.success('Research paper added');
      }
      fetchResearch();
      setResearchModalOpen(false);
      setEditingResearch(null);
      setResearchForm({ title: '', description: '', authors: '', category: 'Endodontics', pdfUrl: '', coverImageUrl: '', pdfFile: null, coverFile: null });
    } catch (err) {
      toast.error('Failed to save research paper');
    }
  };

  // Hospital Gallery Submit
  const handleHospitalGallerySubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', hospitalForm.title);
    data.append('category', hospitalForm.category);
    if (hospitalForm.file) data.append('image', hospitalForm.file);

    try {
      await client.post('/gallery/hospital', data);
      toast.success('Hospital gallery image uploaded');
      fetchGalleries();
      setHospitalGalleryModalOpen(false);
      setHospitalForm({ title: '', category: 'Hospital', imageUrl: '', file: null });
    } catch (err) {
      toast.error('Failed to upload image');
    }
  };

  // Camp Gallery Submit
  const handleCampGallerySubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', campForm.title);
    data.append('location', campForm.location);
    data.append('date', campForm.date);
    if (campForm.file) data.append('image', campForm.file);

    try {
      await client.post('/gallery/camp', data);
      toast.success('Camp gallery image uploaded');
      fetchGalleries();
      setCampGalleryModalOpen(false);
      setCampForm({ title: '', location: 'Vijayawada', date: '', imageUrl: '', file: null });
    } catch (err) {
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark-bg text-gray-900 dark:text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-brand-dark-card border-r border-gray-200 dark:border-white/10 p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-bold">
              D
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Duhita Admin</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Control Center</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <FiGrid size={18} /> Overview
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${
                activeTab === 'appointments'
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <FiCalendar size={18} /> Appointments & Schedule
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${
                activeTab === 'doctors'
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <FiUserCheck size={18} /> Doctors
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('research')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${
                activeTab === 'research'
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <FiFileText size={18} /> Research Papers
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hospitalGallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${
                activeTab === 'hospitalGallery'
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <FiImage size={18} /> Hospital Gallery
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('campGallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${
                activeTab === 'campGallery'
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <FiImage size={18} /> Dental Camp Gallery
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <FiLogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold capitalize">
              {activeTab === 'appointments' ? 'Appointments & Daily Schedule' : activeTab === 'hospitalGallery' ? 'Hospital Gallery' : activeTab === 'campGallery' ? 'Dental Camp Gallery' : activeTab} Management
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back, <span className="font-semibold text-brand-primary">{admin?.username || 'Admin'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-gray-300 dark:border-white/15 px-4 py-2.5 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            >
              🌐 View Live Site
            </a>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-3xl bg-white dark:bg-brand-dark-card p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Appointments</p>
                <h3 className="text-3xl font-extrabold mt-2 text-brand-navy dark:text-white">{appointments.length}</h3>
                <span className="text-xs text-brand-primary mt-1 inline-block">Filter Date: {appointmentDateFilter}</span>
              </div>
              <div className="rounded-3xl bg-white dark:bg-brand-dark-card p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Doctors</p>
                <h3 className="text-3xl font-extrabold mt-2 text-brand-navy dark:text-white">{doctors.length}</h3>
                <span className="text-xs text-emerald-500 mt-1 inline-block">Available for booking</span>
              </div>
              <div className="rounded-3xl bg-white dark:bg-brand-dark-card p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Research Publications</p>
                <h3 className="text-3xl font-extrabold mt-2 text-brand-navy dark:text-white">{researchList.length}</h3>
                <span className="text-xs text-blue-500 mt-1 inline-block">PDF documents available</span>
              </div>
              <div className="rounded-3xl bg-white dark:bg-brand-dark-card p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Gallery Items</p>
                <h3 className="text-3xl font-extrabold mt-2 text-brand-navy dark:text-white">{hospitalGallery.length + campGallery.length}</h3>
                <span className="text-xs text-purple-500 mt-1 inline-block">Hospital & Camp photos</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-3xl bg-white dark:bg-brand-dark-card p-6 border border-gray-200 dark:border-white/10 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Quick Management Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  className="rounded-2xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
                >
                  Manage Appointments & Schedule
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('doctors');
                    setDoctorModalOpen(true);
                  }}
                  className="rounded-2xl border border-gray-300 dark:border-white/15 px-5 py-3 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  + Add New Doctor
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('research');
                    setResearchModalOpen(true);
                  }}
                  className="rounded-2xl border border-gray-300 dark:border-white/15 px-5 py-3 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  + Upload Research Paper
                </button>
              </div>
            </div>
          </div>
        )}

        {/* APPOINTMENTS & SCHEDULE TAB */}
        {activeTab === 'appointments' && (
          <div className="space-y-10">
            {/* Filter Bar */}
            <div className="rounded-3xl bg-white dark:bg-brand-dark-card p-5 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Calendar Date</label>
                  <input
                    type="date"
                    value={appointmentDateFilter}
                    onChange={(e) => setAppointmentDateFilter(e.target.value)}
                    className="rounded-xl border border-gray-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm font-semibold outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Filter Status</label>
                  <select
                    value={appointmentStatusFilter}
                    onChange={(e) => setAppointmentStatusFilter(e.target.value)}
                    className="rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-brand-dark-card px-3 py-2 text-sm font-semibold outline-none focus:border-brand-primary"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setAppointmentDateFilter(new Date().toISOString().split('T')[0])}
                  className="mt-5 text-xs font-semibold text-brand-primary underline"
                >
                  Reset to Today
                </button>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patient, phone, ID..."
                  value={appointmentSearch}
                  onChange={(e) => setAppointmentSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-transparent pl-10 pr-4 py-2 text-sm outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* 1. ACTUAL APPOINTMENTS TABLE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FiCalendar className="text-brand-primary" /> Appointments List ({appointmentDateFilter})
                </h3>
              </div>

              <div className="overflow-hidden rounded-3xl bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <th className="py-4 px-6">Patient Info</th>
                        <th className="py-4 px-6">Doctor</th>
                        <th className="py-4 px-6">Date & Slot</th>
                        <th className="py-4 px-6">Problem</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10 text-sm">
                      {loadingAppointments ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500">Loading appointments...</td>
                        </tr>
                      ) : appointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500">No appointments found for selected filter.</td>
                        </tr>
                      ) : (
                        appointments.map((apt) => (
                          <tr key={apt._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6">
                              <div className="font-bold text-gray-900 dark:text-white">{apt.name}</div>
                              <div className="text-xs text-gray-500">📞 {apt.contactNo}</div>
                              <div className="text-xs font-mono text-brand-primary">{apt.patientId} ({apt.patientType})</div>
                            </td>
                            <td className="py-4 px-6 font-medium">{apt.doctorName}</td>
                            <td className="py-4 px-6">
                              <div>{apt.appointmentDate}</div>
                              <div className="text-xs text-gray-500 font-semibold">{apt.timeSlot}</div>
                            </td>
                            <td className="py-4 px-6 text-xs text-gray-600 dark:text-gray-300 max-w-xs truncate">
                              {apt.problem || 'Routine Checkup'}
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={apt.status}
                                onChange={(e) => handleUpdateStatus(apt._id, e.target.value)}
                                className={`rounded-xl px-3 py-1 text-xs font-bold outline-none cursor-pointer ${
                                  apt.status === 'Confirmed'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                    : apt.status === 'Completed'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                                    : apt.status === 'Cancelled'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                type="button"
                                onClick={() => setDeleteConfirm({ open: true, type: 'appointment', id: apt._id, title: `Appointment for ${apt.name}` })}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                title="Delete Appointment"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 2. SCHEDULE TABLE (CUSTOM INTERVAL & PRIORITY REORDER) */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FiClock className="text-brand-primary" /> Daily Schedule Table ({appointmentDateFilter})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Timed schedule with custom time intervals, priority ordering (▲ / ▼), and instant editing.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAppointmentsToSchedule}
                    className="inline-flex items-center gap-2 rounded-2xl border border-brand-primary/30 bg-brand-primary/10 text-brand-primary px-4 py-2 text-xs font-semibold hover:bg-brand-primary/20 transition-all"
                  >
                    <FiCopy size={15} /> Copy Appointments to Schedule
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingSchedule(null);
                      setScheduleForm({
                        patientName: '',
                        patientId: '',
                        contactNo: '',
                        doctorName: 'Dr. Nalluru Sasidhar',
                        date: appointmentDateFilter,
                        timeInterval: '09:00 AM - 09:30 AM',
                        status: 'Scheduled',
                        notes: '',
                      });
                      setScheduleModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand-primary/90 transition-all"
                  >
                    <FiPlus size={15} /> Add Schedule Entry
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <th className="py-4 px-4 text-center w-20">Priority</th>
                        <th className="py-4 px-6">Time Interval</th>
                        <th className="py-4 px-6">Patient Name & ID</th>
                        <th className="py-4 px-6">Doctor</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Notes / Reason</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10 text-sm">
                      {loadingSchedule ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">Loading daily schedule...</td>
                        </tr>
                      ) : scheduleList.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">
                            No schedule entries for this date. Click <strong>"Copy Appointments to Schedule"</strong> or <strong>"+ Add Schedule Entry"</strong> above.
                          </td>
                        </tr>
                      ) : (
                        scheduleList.map((item, index) => (
                          <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            {/* Priority Maker: Up / Down Arrows */}
                            <td className="py-4 px-4 text-center">
                              <div className="flex flex-col items-center justify-center gap-1">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleReorderSchedule(item._id, 'up')}
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 transition-colors text-brand-primary"
                                  title="Move Up in Priority"
                                >
                                  <FiArrowUp size={14} />
                                </button>
                                <span className="text-xs font-bold font-mono text-gray-400">{index + 1}</span>
                                <button
                                  type="button"
                                  disabled={index === scheduleList.length - 1}
                                  onClick={() => handleReorderSchedule(item._id, 'down')}
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 transition-colors text-brand-primary"
                                  title="Move Down in Priority"
                                >
                                  <FiArrowDown size={14} />
                                </button>
                              </div>
                            </td>

                            {/* Time Interval */}
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-xl text-xs">
                                <FiClock size={13} /> {item.timeInterval}
                              </span>
                            </td>

                            {/* Patient Name & ID */}
                            <td className="py-4 px-6">
                              <div className="font-bold text-gray-900 dark:text-white">{item.patientName}</div>
                              {item.patientId && <div className="text-xs font-mono text-gray-500">{item.patientId}</div>}
                              {item.contactNo && <div className="text-xs text-gray-400">📞 {item.contactNo}</div>}
                            </td>

                            {/* Doctor */}
                            <td className="py-4 px-6 font-medium text-xs text-gray-700 dark:text-gray-300">
                              {item.doctorName}
                            </td>

                            {/* Status */}
                            <td className="py-4 px-6">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                                item.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                                  : item.status === 'In Progress'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                  : item.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                              }`}>
                                {item.status}
                              </span>
                            </td>

                            {/* Notes */}
                            <td className="py-4 px-6 text-xs text-gray-500 max-w-xs truncate">
                              {item.notes || '—'}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingSchedule(item);
                                    setScheduleForm({
                                      patientName: item.patientName,
                                      patientId: item.patientId || '',
                                      contactNo: item.contactNo || '',
                                      doctorName: item.doctorName || 'Dr. Nalluru Sasidhar',
                                      date: item.date,
                                      timeInterval: item.timeInterval,
                                      status: item.status,
                                      notes: item.notes || '',
                                    });
                                    setScheduleModalOpen(true);
                                  }}
                                  className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-colors"
                                  title="Edit Schedule Entry & Time Interval"
                                >
                                  <FiEdit size={16} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirm({ open: true, type: 'schedule', id: item._id, title: `Schedule entry for ${item.patientName}` })}
                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                  title="Delete Schedule Entry"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOCTORS TAB */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Managed Doctors</h3>
              <button
                type="button"
                onClick={() => {
                  setEditingDoctor(null);
                  setDoctorForm({ name: '', qualification: '', specialization: '', experienceYears: 10, highlights: '', image: '', file: null });
                  setDoctorModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
              >
                <FiPlus size={18} /> Add Doctor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div key={doc._id} className="rounded-3xl bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <img
                      src={doc.image ? resolveFileUrl(doc.image) : 'https://www.duhitadental.in/wp-content/uploads/2023/05/Untitled-design-300x300.png'}
                      alt={doc.name}
                      className="h-32 w-32 object-cover rounded-2xl mb-4 border"
                    />
                    <h4 className="font-bold text-lg">{doc.name}</h4>
                    <p className="text-xs font-semibold text-brand-primary">{doc.qualification}</p>
                    <p className="text-xs text-gray-500 mt-1">{doc.specialization} • {doc.experienceYears} Years Exp.</p>
                  </div>
                  <div className="mt-6 flex justify-end gap-2 border-t pt-4 border-gray-100 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDoctor(doc);
                        setDoctorForm({
                          name: doc.name || '',
                          qualification: doc.qualification || '',
                          specialization: doc.specialization || '',
                          experienceYears: doc.experienceYears || 10,
                          highlights: Array.isArray(doc.highlights) ? doc.highlights.join(', ') : (doc.highlights || ''),
                          image: doc.image || '',
                          file: null,
                        });
                        setDoctorModalOpen(true);
                      }}
                      className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-xl"
                      title="Edit Doctor"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm({ open: true, type: 'doctor', id: doc._id, title: doc.name })}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                      title="Delete Doctor"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESEARCH TAB */}
        {activeTab === 'research' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Research Papers</h3>
              <button
                type="button"
                onClick={() => {
                  setEditingResearch(null);
                  setResearchForm({ title: '', description: '', authors: '', category: 'Endodontics', pdfUrl: '', coverImageUrl: '', pdfFile: null, coverFile: null });
                  setResearchModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
              >
                <FiPlus size={18} /> Upload Research Paper
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchList.map((paper) => (
                <div key={paper._id} className="rounded-3xl bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-primary uppercase">{paper.category}</span>
                    <h4 className="font-bold text-lg mt-1">{paper.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">Published: {paper.publishDate} by {paper.authors}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">{paper.description}</p>
                  </div>
                  <div className="mt-6 flex justify-between items-center border-t pt-4 border-gray-100 dark:border-white/10">
                    <a
                      href={resolveFileUrl(paper.pdfUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-brand-primary hover:underline"
                    >
                      📄 Open PDF
                    </a>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingResearch(paper);
                          setResearchForm({
                            title: paper.title || '',
                            description: paper.description || '',
                            authors: paper.authors || '',
                            category: paper.category || 'Endodontics',
                            pdfUrl: paper.pdfUrl || '',
                            coverImageUrl: paper.coverImageUrl || '',
                            pdfFile: null,
                            coverFile: null,
                          });
                          setResearchModalOpen(true);
                        }}
                        className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-xl"
                        title="Edit Research Paper"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm({ open: true, type: 'research', id: paper._id, title: paper.title })}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                        title="Delete Research Paper"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOSPITAL GALLERY TAB */}
        {activeTab === 'hospitalGallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Hospital Gallery Images</h3>
              <button
                type="button"
                onClick={() => setHospitalGalleryModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
              >
                <FiPlus size={18} /> Upload Hospital Photo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hospitalGallery.map((img) => (
                <div key={img._id} className="relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-card shadow-sm aspect-video">
                  <img src={resolveFileUrl(img.imageUrl)} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                    <span className="text-xs font-bold">{img.title}</span>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm({ open: true, type: 'hospitalGallery', id: img._id, title: img.title })}
                      className="self-end p-2 bg-red-600 rounded-xl text-white hover:bg-red-700"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DENTAL CAMP GALLERY TAB */}
        {activeTab === 'campGallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Dental Camp Gallery Images</h3>
              <button
                type="button"
                onClick={() => setCampGalleryModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
              >
                <FiPlus size={18} /> Upload Camp Photo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {campGallery.map((img) => (
                <div key={img._id} className="relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-card shadow-sm aspect-video">
                  <img src={resolveFileUrl(img.imageUrl)} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                    <div>
                      <h5 className="text-xs font-bold">{img.title}</h5>
                      <p className="text-[10px] text-gray-300">{img.location}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm({ open: true, type: 'campGallery', id: img._id, title: img.title })}
                      className="self-end p-2 bg-red-600 rounded-xl text-white hover:bg-red-700"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}

      {/* Schedule Entry Add / Edit Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-brand-dark-card rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">{editingSchedule ? 'Edit Schedule Entry' : 'Add Schedule Entry'}</h3>
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Time Interval (e.g. 09:00 AM - 09:30 AM) *</label>
                <input
                  type="text"
                  required
                  placeholder="09:00 AM - 09:30 AM"
                  value={scheduleForm.timeInterval}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, timeInterval: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm bg-transparent font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Patient Name"
                  value={scheduleForm.patientName}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, patientName: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Patient ID</label>
                  <input
                    type="text"
                    placeholder="DUH-2026-1234"
                    value={scheduleForm.patientId}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, patientId: e.target.value })}
                    className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Contact No.</label>
                  <input
                    type="text"
                    placeholder="9440313066"
                    value={scheduleForm.contactNo}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, contactNo: e.target.value })}
                    className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Doctor Name</label>
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={scheduleForm.doctorName}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, doctorName: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                <select
                  value={scheduleForm.status}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, status: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm bg-white dark:bg-brand-dark-card"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Notes / Reason</label>
                <textarea
                  rows={2}
                  placeholder="Notes..."
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                  className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white">
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctor Modal */}
      {doctorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-brand-dark-card rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h3>
            <form onSubmit={handleDoctorSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Doctor Name"
                required
                value={doctorForm.name}
                onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <input
                type="text"
                placeholder="Qualification (e.g. M.D.S)"
                required
                value={doctorForm.qualification}
                onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <input
                type="text"
                placeholder="Specialization"
                value={doctorForm.specialization}
                onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <input
                type="text"
                placeholder="Highlights (comma separated)"
                value={doctorForm.highlights}
                onChange={(e) => setDoctorForm({ ...doctorForm, highlights: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Doctor Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDoctorForm({ ...doctorForm, file: e.target.files[0] })}
                  className="text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDoctorModalOpen(false)}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Research Modal */}
      {researchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-brand-dark-card rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">{editingResearch ? 'Edit Research Paper' : 'Upload Research Paper'}</h3>
            <form onSubmit={handleResearchSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Research Paper Title"
                required
                value={researchForm.title}
                onChange={(e) => setResearchForm({ ...researchForm, title: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <textarea
                placeholder="Description / Abstract"
                required
                rows={3}
                value={researchForm.description}
                onChange={(e) => setResearchForm({ ...researchForm, description: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <input
                type="text"
                placeholder="Authors (e.g. Dr. Nalluru Sasidhar)"
                value={researchForm.authors}
                onChange={(e) => setResearchForm({ ...researchForm, authors: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    PDF File {editingResearch ? '(Optional)' : '*'}
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    required={!editingResearch}
                    onChange={(e) => setResearchForm({ ...researchForm, pdfFile: e.target.files[0] })}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setResearchForm({ ...researchForm, coverFile: e.target.files[0] })}
                    className="text-xs"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResearchModalOpen(false)}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white">
                  Upload Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hospital Gallery Modal */}
      {hospitalGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-brand-dark-card rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Upload Hospital Gallery Image</h3>
            <form onSubmit={handleHospitalGallerySubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Image Title"
                required
                value={hospitalForm.title}
                onChange={(e) => setHospitalForm({ ...hospitalForm, title: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Select Image File *</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setHospitalForm({ ...hospitalForm, file: e.target.files[0] })}
                  className="text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setHospitalGalleryModalOpen(false)}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Camp Gallery Modal */}
      {campGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-brand-dark-card rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Upload Dental Camp Gallery Image</h3>
            <form onSubmit={handleCampGallerySubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Camp Event Title"
                required
                value={campForm.title}
                onChange={(e) => setCampForm({ ...campForm, title: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <input
                type="text"
                placeholder="Location (e.g. Benz Circle)"
                value={campForm.location}
                onChange={(e) => setCampForm({ ...campForm, location: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <input
                type="date"
                value={campForm.date}
                onChange={(e) => setCampForm({ ...campForm, date: e.target.value })}
                className="w-full rounded-xl border p-2.5 text-sm bg-transparent"
              />
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Select Image File *</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setCampForm({ ...campForm, file: e.target.files[0] })}
                  className="text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCampGalleryModalOpen(false)}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-brand-dark-card rounded-3xl p-6 shadow-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FiTrash2 size={24} />
            </div>
            <h4 className="text-lg font-bold">Confirm Deletion</h4>
            <p className="text-xs text-gray-500 mt-1">Are you sure you want to delete <span className="font-semibold">{deleteConfirm.title}</span>?</p>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirm({ open: false, type: '', id: '', title: '' })}
                className="flex-1 rounded-xl border py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
