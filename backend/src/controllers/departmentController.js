import Department from "../models/Department.js";

export async function getDepartments(req, res, next) {
  try {
    const departments = await Department.find({ isActive: true }).sort("name");
    res.json(departments);
  } catch (error) {
    next(error);
  }
}

export async function createDepartment(req, res, next) {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
}

export async function updateDepartment(req, res, next) {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!department) {
      res.status(404);
      throw new Error("Department not found.");
    }

    res.json(department);
  } catch (error) {
    next(error);
  }
}

export async function deleteDepartment(req, res, next) {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      res.status(404);
      throw new Error("Department not found.");
    }

    res.json({ message: "Department deleted." });
  } catch (error) {
    next(error);
  }
}
