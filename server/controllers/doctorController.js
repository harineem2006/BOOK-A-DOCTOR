const Doctor = require('../models/Doctor');

const getDoctors = async (req, res) => {
  try {
    const { specialty, search } = req.query;
    let query = {};
    if (specialty) query.specialty = specialty;
    if (search) query.name = { $regex: search, $options: 'i' };
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
