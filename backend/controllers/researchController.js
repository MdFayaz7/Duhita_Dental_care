import Research from '../models/Research.js';

export const getResearch = async (req, res, next) => {
  try {
    const research = await Research.find().sort({ createdAt: -1 });
    res.json({ success: true, count: research.length, research });
  } catch (error) {
    next(error);
  }
};

export const createResearch = async (req, res, next) => {
  try {
    const { title, description, authors, publishDate, category, coverImageUrl, pdfUrl } = req.body;

    // Files were saved to GridFS by saveFilesToGridFS middleware
    let finalPdfUrl = pdfUrl || '';
    let finalCoverUrl = coverImageUrl || '';

    if (req.files) {
      if (req.files.pdf && req.files.pdf[0] && req.files.pdf[0].gridfsId) {
        finalPdfUrl = `/api/files/${req.files.pdf[0].gridfsId}`;
      }
      if (req.files.cover && req.files.cover[0] && req.files.cover[0].gridfsId) {
        finalCoverUrl = `/api/files/${req.files.cover[0].gridfsId}`;
      }
    }

    if (!finalPdfUrl) {
      return res.status(400).json({ success: false, message: 'PDF document is required' });
    }

    const item = await Research.create({
      title,
      description,
      authors: authors || 'Dr. Nalluru Sasidhar',
      publishDate: publishDate || new Date().toISOString().split('T')[0],
      category: category || 'Clinical Research',
      pdfUrl: finalPdfUrl,
      coverImageUrl: finalCoverUrl,
    });

    res.status(201).json({ success: true, research: item });
  } catch (error) {
    next(error);
  }
};

export const updateResearch = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.files) {
      if (req.files.pdf && req.files.pdf[0] && req.files.pdf[0].gridfsId) {
        updateData.pdfUrl = `/api/files/${req.files.pdf[0].gridfsId}`;
      }
      if (req.files.cover && req.files.cover[0] && req.files.cover[0].gridfsId) {
        updateData.coverImageUrl = `/api/files/${req.files.cover[0].gridfsId}`;
      }
    }

    const item = await Research.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Research paper not found' });
    }

    res.json({ success: true, research: item });
  } catch (error) {
    next(error);
  }
};

export const deleteResearch = async (req, res, next) => {
  try {
    const item = await Research.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Research paper not found' });
    }
    res.json({ success: true, message: 'Research paper deleted successfully' });
  } catch (error) {
    next(error);
  }
};
