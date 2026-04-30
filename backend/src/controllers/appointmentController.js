import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

export async function createAppointment(req, res, next) {
  try {
    const { doctor, appointmentDate, appointmentTime, patientName, email, phone, department } = req.body;

    if (!appointmentDate || !appointmentTime || !patientName || !email || !phone || !department) {
      res.status(400);
      throw new Error("Please fill all required appointment fields.");
    }

    let doctorName = req.body.doctorName || "Any Available Doctor";
    if (doctor) {
      const selectedDoctor = await Doctor.findById(doctor);
      if (!selectedDoctor) {
        res.status(404);
        throw new Error("Selected doctor not found.");
      }
      doctorName = selectedDoctor.name;
    }

    const appointmentPayload = { ...req.body };
    if (!doctor) delete appointmentPayload.doctor;

    const appointment = await Appointment.create({
      ...appointmentPayload,
      doctorName,
      patient: req.user?._id
    });

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
}

export async function getMyAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor", "name specialization department")
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
}

export async function getAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization department")
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
}

export async function updateAppointmentStatus(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found.");
    }

    res.json(appointment);
  } catch (error) {
    next(error);
  }
}

export async function deleteAppointment(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found.");
    }

    res.json({ message: "Appointment deleted." });
  } catch (error) {
    next(error);
  }
}
