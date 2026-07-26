import HospitalGallery from '../models/HospitalGallery.js';
import CampGallery from '../models/CampGallery.js';

// Hospital Gallery
export const getHospitalGallery = async (req, res, next) => {
  try {
    const images = await HospitalGallery.find().sort({ createdAt: -1 });
    res.json({ success: true, count: images.length, images });
  } catch (error) {
    next(error);
  }
};

export const addHospitalGallery = async (req, res, next) => {
  try {
    const { title, description, category, imageUrl } = req.body;

    // File was saved to GridFS by saveToGridFS middleware
    let finalUrl = imageUrl || '';
    if (req.file && req.file.gridfsId) {
      finalUrl = `/api/files/${req.file.gridfsId}`;
    }

    if (!finalUrl) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const image = await HospitalGallery.create({
      title: title || 'Hospital Facility',
      description: description || '',
      category: category || 'Hospital',
      imageUrl: finalUrl,
    });

    res.status(201).json({ success: true, image });
  } catch (error) {
    next(error);
  }
};

export const deleteHospitalGallery = async (req, res, next) => {
  try {
    const image = await HospitalGallery.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    res.json({ success: true, message: 'Hospital image deleted' });
  } catch (error) {
    next(error);
  }
};

// Dental Camp Gallery
export const getCampGallery = async (req, res, next) => {
  try {
    const images = await CampGallery.find().sort({ createdAt: -1 });
    res.json({ success: true, count: images.length, images });
  } catch (error) {
    next(error);
  }
};

export const addCampGallery = async (req, res, next) => {
  try {
    const { title, description, location, date, imageUrl } = req.body;

    // File was saved to GridFS by saveToGridFS middleware
    let finalUrl = imageUrl || '';
    if (req.file && req.file.gridfsId) {
      finalUrl = `/api/files/${req.file.gridfsId}`;
    }

    if (!finalUrl) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const image = await CampGallery.create({
      title: title || 'Free Dental Camp',
      description: description || '',
      location: location || 'Vijayawada',
      date: date || new Date().toISOString().split('T')[0],
      imageUrl: finalUrl,
    });

    res.status(201).json({ success: true, image });
  } catch (error) {
    next(error);
  }
};

export const deleteCampGallery = async (req, res, next) => {
  try {
    const image = await CampGallery.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    res.json({ success: true, message: 'Camp image deleted' });
  } catch (error) {
    next(error);
  }
};
