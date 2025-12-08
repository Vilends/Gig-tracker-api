const express = require('express');
const Gig = require('../models/Gig');

const router = express.Router();

// CREATE - POST /api/gigs
router.post('/', async (req, res) => {
  try {
    console.log('REQ BODY:', req.body); // <-- temporary debug

    const { clientName, title, budget, status, isPaid, dueDate, notes } = req.body;

    if (!clientName || !title) {
      return res.status(400).json({ message: 'clientName and title are required' });
    }

    const gig = await Gig.create({
      clientName,
      title,
      budget,
      status,
      isPaid,
      dueDate,
      notes,
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error('Error creating gig:', error.message);
    res.status(500).json({ error: 'Server error while creating gig' });
  }
});

// READ ALL - GET /api/gigs
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    console.error('Error fetching gigs:', error.message);
    res.status(500).json({ error: 'Server error while fetching gigs' });
  }
});

// READ ONE - GET /api/gigs/:id
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json(gig);
  } catch (error) {
    console.error('Error fetching gig:', error.message);
    res.status(500).json({ error: 'Server error while fetching gig' });
  }
});

// UPDATE - PUT /api/gigs/:id
router.put('/:id', async (req, res) => {
  try {
    const { clientName, title, budget, status, isPaid, dueDate, notes } = req.body;

    const gig = await Gig.findByIdAndUpdate(
      req.params.id,
      { clientName, title, budget, status, isPaid, dueDate, notes },
      { new: true, runValidators: true }
    );

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json(gig);
  } catch (error) {
    console.error('Error updating gig:', error.message);
    res.status(500).json({ error: 'Server error while updating gig' });
  }
});

// DELETE - DELETE /api/gigs/:id
router.delete('/:id', async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json({ message: 'Gig deleted successfully' });
  } catch (error) {
    console.error('Error deleting gig:', error.message);
    res.status(500).json({ error: 'Server error while deleting gig' });
  }
});

module.exports = router;
