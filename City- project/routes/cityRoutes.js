const express = require('express');
const router = express.Router();
const City = require('../models/City');

// Add City
router.post('/', async (req, res) => {
  try {
    const { name, population, country, latitude, longitude } = req.body;

    // Check if city already exists
    const existingCity = await City.findOne({ name: name.trim() });
    if (existingCity) {
      return res.status(400).json({ message: 'City with this name already exists.' });
    }

    const city = new City({
      name: name.trim(),
      population,
      country: country.trim(),
      latitude,
      longitude,
    });

    const savedCity = await city.save();
    res.status(201).json({
      message: 'City added successfully.',
      data: savedCity,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Update City
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if updating name to an existing city's name
    if (updates.name) {
      const existingCity = await City.findOne({ name: updates.name.trim() });
      if (existingCity && existingCity._id.toString() !== id) {
        return res.status(400).json({ message: 'City with this name already exists.' });
      }
    }

    const updatedCity = await City.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found.' });
    }

    res.status(200).json({
      message: 'City updated successfully.',
      data: updatedCity,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Delete City
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findByIdAndDelete(id);

    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found.' });
    }

    res.status(200).json({
      message: 'City deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Get Cities
router.get('/', async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      filter,
      sort,
      search,
      projection,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    // Search
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter
    if (filter) {
      const filters = JSON.parse(filter);
      Object.assign(query, filters);
    }

    // Projection
    let select = null;
    if (projection) {
      const fields = projection.split(',').join(' ');
      select = fields;
    }

    // Sort
    let sortBy = null;
    if (sort) {
      const sortParams = sort.split(':');
      sortBy = { [sortParams[0]]: sortParams[1] === 'desc' ? -1 : 1 };
    }

    const cities = await City.find(query)
      .select(select)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await City.countDocuments(query);

    res.status(200).json({
      message: 'Cities retrieved successfully.',
      data: cities,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
