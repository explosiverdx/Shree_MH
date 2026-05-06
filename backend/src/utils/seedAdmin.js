import User from "../models/User.js";

export default async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return;

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    existingAdmin.name = process.env.ADMIN_NAME || "Hospital CEO";
    existingAdmin.password = password;
    existingAdmin.role = "admin";
    await existingAdmin.save();
    console.log(`CEO admin synced: ${email}`);
    return;
  }

  await User.create({
    name: process.env.ADMIN_NAME || "Hospital CEO",
    email,
    password,
    role: "admin"
  });

  console.log(`CEO admin created: ${email}`);
}
