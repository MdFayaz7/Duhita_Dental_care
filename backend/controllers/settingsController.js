import Settings from '../models/Settings.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    let updateData = { ...req.body };

    if (req.file) {
      updateData.logoUrl = `/uploads/${req.file.filename}`;
    }

    if (!settings) {
      settings = await Settings.create(updateData);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, updateData, {
        new: true,
        runValidators: true,
      });
    }

    res.json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};
