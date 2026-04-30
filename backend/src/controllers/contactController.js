import Contact from "../models/Contact.js";

export async function createContact(req, res, next) {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
}

export async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      res.status(404);
      throw new Error("Contact inquiry not found.");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res, next) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Contact inquiry not found.");
    }

    res.json({ message: "Contact inquiry deleted." });
  } catch (error) {
    next(error);
  }
}
