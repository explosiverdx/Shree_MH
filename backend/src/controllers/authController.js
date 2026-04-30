import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

function userResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user)
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required.");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409);
      throw new Error("Email is already registered.");
    }

    const user = await User.create({ name, email, password, phone, role: "patient" });
    res.status(201).json(userResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    res.json(userResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.role !== "admin" || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid admin credentials.");
    }

    res.json(userResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function profile(req, res) {
  res.json(req.user);
}
