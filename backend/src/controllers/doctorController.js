import Doctor from "../models/Doctor.js";

export async function getDoctors(req, res, next) {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    next(error);
  }
}

export async function getDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      res.status(404);
      throw new Error("Doctor not found.");
    }
    res.json(doctor);
  } catch (error) {
    next(error);
  }
}

export async function createDoctor(req, res, next) {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    next(error);
  }
}

export async function updateDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doctor) {
      res.status(404);
      throw new Error("Doctor not found.");
    }

    res.json(doctor);
  } catch (error) {
    next(error);
  }
}

export async function deleteDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      res.status(404);
      throw new Error("Doctor not found.");
    }

    res.json({ message: "Doctor deleted." });
  } catch (error) {
    next(error);
  }
}
