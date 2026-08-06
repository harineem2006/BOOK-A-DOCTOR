const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;
    const appointment = await Appointment.create({ patient: req.user._id, doctor, date, time, reason });
    res.status(201).json(appointment);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id }).populate('doctor', 'name specialty avatar');
    res.json(appointments);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    res.json(appointment);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient', 'name email').populate('doctor', 'name specialty');
    res.json(appointments);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { bookAppointment, getMyAppointments, cancelAppointment, getAllAppointments };
