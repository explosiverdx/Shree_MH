import User from "../models/User.js";

export default async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return;

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) return;

  await User.create({
    name: process.env.ADMIN_NAME || "Hospital Admin",
    email,
    password,
    role: "admin"
  });

  console.log(`Default admin created: ${email}`);
}
