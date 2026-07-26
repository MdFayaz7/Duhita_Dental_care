import Doctor from '../models/Doctor.js';

export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().sort({ isDefault: -1, displayOrder: 1, createdAt: 1 });
    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (req, res, next) => {
  try {
    const { name, qualification, specialization, experienceYears, highlights, phone, email, isDefault } = req.body;

    // If a file was uploaded it will have been saved to GridFS by the saveToGridFS middleware
    // and req.file.gridfsId will be set. We store /api/files/:id as the image URL so it's
    // served via our own endpoint (works on any host, no ephemeral disk involved).
    let image = req.body.image || '';
    if (req.file && req.file.gridfsId) {
      image = `/api/files/${req.file.gridfsId}`;
    }

    const doctor = await Doctor.create({
      name,
      qualification,
      specialization,
      experienceYears: Number(experienceYears) || 0,
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',') : []),
      phone,
      email,
      image,
      isDefault: isDefault === 'true' || isDefault === true,
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.file && req.file.gridfsId) {
      updateData.image = `/api/files/${req.file.gridfsId}`;
    }

    if (typeof updateData.highlights === 'string') {
      updateData.highlights = updateData.highlights.split(',').map((s) => s.trim());
    }

    const doctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    next(error);
  }
};
