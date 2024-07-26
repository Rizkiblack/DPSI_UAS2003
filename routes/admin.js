const express = require('express');
const router = express.Router();
const { Admin } = require("../models"); // Assuming 'admin' is imported from a models index file
const { authenticate, authorize } = require('../middleware/auth');

// GET all admins
router.get("/", authenticate, async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET admin by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const adminData = await Admin.findByPk(req.params.id);
    if (adminData) {
      res.json(adminData);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new admin
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = await Admin.create({ username, password });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update an admin by ID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { username, password } = req.body;
    const [updated] = await Admin.update(
      { username, password },
      { where: { id: req.params.id } } // Ensure the field name matches your model definition
    );
    if (updated) {
      const updatedAdmin = await Admin.findByPk(req.params.id);
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an admin by ID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const deleted = await Admin.destroy({ where: { id: req.params.id } }); // Ensure the field name matches your model definition
    if (deleted) {
      res.json({ message: "Admin deleted" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
