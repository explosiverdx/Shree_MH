import Department from "../models/Department.js";
import Doctor from "../models/Doctor.js";

const departments = [
  {
    name: "Orthopedics",
    icon: "Bone",
    description: "Bone, joint, fracture, arthritis, sports injury, and trauma care from experienced orthopedic specialists."
  },
  {
    name: "Joint Replacement",
    icon: "Activity",
    description: "Knee, hip, and shoulder replacement planning with modern surgical care and recovery support."
  },
  {
    name: "Spine Care",
    icon: "Stethoscope",
    description: "Back pain, neck pain, disc problems, posture concerns, and spine rehabilitation care."
  },
  {
    name: "Emergency & Trauma",
    icon: "HeartPulse",
    description: "24/7 emergency response for fractures, accidents, pain, trauma, and urgent multispeciality support."
  }
];

const doctors = [
  {
    name: "Dr. Rajesh Sharma",
    department: "Orthopedics",
    specialization: "Senior Orthopedic Surgeon",
    experience: 18,
    qualification: "MS Ortho",
    fee: 120,
    availableDays: ["Monday", "Wednesday", "Friday"],
    bio: "Specialist in fracture, joint, arthritis, and sports injury care."
  },
  {
    name: "Dr. Meera Patel",
    department: "Joint Replacement",
    specialization: "Joint Replacement Specialist",
    experience: 14,
    qualification: "MS Ortho, Fellowship Arthroplasty",
    fee: 95,
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    bio: "Focused on knee, hip, and shoulder replacement care."
  },
  {
    name: "Dr. Amit Verma",
    department: "Spine Care",
    specialization: "Spine and Trauma Consultant",
    experience: 16,
    qualification: "MS Ortho, Spine Fellowship",
    fee: 130,
    availableDays: ["Monday", "Tuesday", "Thursday"],
    bio: "Focused on back pain, spine problems, and trauma rehabilitation."
  }
];

export default async function seedHospitalData() {
  const departmentCount = await Department.countDocuments();
  if (departmentCount === 0) {
    await Department.insertMany(departments);
    console.log("Seed departments created.");
  }

  const doctorCount = await Doctor.countDocuments();
  if (doctorCount === 0) {
    await Doctor.insertMany(doctors);
    console.log("Seed doctors created.");
  }
}
