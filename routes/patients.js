const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Add a new patient
router.post('/', async (req, res) => {
    const { name, age, address, condition } = req.body;
    try {
        const newPatient = new Patient({ name, age, address, condition });
        await newPatient.save();
        res.json(newPatient);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Patient removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;