const express = require("express");
const router = express.Router();
const Budaya = require("./models/Budaya"); // Sesuaikan dengan lokasi model Budaya Anda
const Data = require("./models/Data"); // Sesuaikan dengan lokasi model Data Anda
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk mendapatkan semua budaya
router.get("/", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const budaya = await Budaya.findAll({ include: Data });
    res.json(budaya);
  } catch (err) {
    console.error("Error fetching budaya:", err);
    res.status(500).json({ error: "Failed to fetch budaya" });
  }
});

// Endpoint untuk mendapatkan budaya berdasarkan BudayaID
router.get("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const budaya = await Budaya.findByPk(id, { include: Data });
    if (!budaya) {
      return res.status(404).json({ error: "Budaya not found" });
    }
    res.json(budaya);
  } catch (err) {
    console.error("Error fetching budaya:", err);
    res.status(500).json({ error: "Failed to fetch budaya" });
  }
});

// Endpoint untuk membuat budaya baru
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  const { gambar, detail, DataID } = req.body;
  try {
    const newBudaya = await Budaya.create({ gambar, detail, DataID });
    res.status(201).json(newBudaya);
  } catch (err) {
    console.error("Error creating budaya:", err);
    res.status(500).json({ error: "Failed to create budaya" });
  }
});

// Endpoint untuk memperbarui budaya berdasarkan BudayaID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const { gambar, detail, DataID } = req.body;
  try {
    const budayaToUpdate = await Budaya.findByPk(id);
    if (!budayaToUpdate) {
      return res.status(404).json({ error: "Budaya not found" });
    }
    await budayaToUpdate.update({ gambar, detail, DataID });
    res.json(budayaToUpdate);
  } catch (err) {
    console.error("Error updating budaya:", err);
    res.status(500).json({ error: "Failed to update budaya" });
  }
});

// Endpoint untuk menghapus budaya berdasarkan BudayaID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const budayaToDelete = await Budaya.findByPk(id);
    if (!budayaToDelete) {
      return res.status(404).json({ error: "Budaya not found" });
    }
    await budayaToDelete.destroy();
    res.json({ message: "Budaya deleted successfully" });
  } catch (err) {
    console.error("Error deleting budaya:", err);
    res.status(500).json({ error: "Failed to delete budaya" });
  }
});

module.exports = router;
