// ============================================================
// routes/service.js
// Defines the API routes for community service records.
// ============================================================
//
// ✏️  TASK (FIX BUGS): There are TWO bugs in this file.
//     Find them, fix them, and write a short comment next to each
//     fix explaining what was wrong.
//
// ============================================================

const express = require('express');
const router  = express.Router();
const serviceModel = require('../models/serviceModel');

// GET /api/service — return all records
router.get('/', async (req, res) => {
  try {
    const records = await serviceModel.getAllRecords();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/service — add a new record
router.post('/', async (req, res) => {
  try {
    // FIX 1: Changed `recipient` to `organization`
    // because the form sends a field named `organization`, not `recipient`.
    const { student_name, student_id, activity_date, hours, organization } = req.body;

    const record = await serviceModel.addRecord(
      student_name,
      student_id,
      activity_date,
      hours,
      organization
    );

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FIX 2: This route should use GET instead of POST
// because it only reads/report data and does not create anything.
router.get('/report', async (req, res) => {
  try {
    const report = await serviceModel.getHoursByStudent();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
