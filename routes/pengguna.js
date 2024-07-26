const express = require("express");
const router = express.Router();
const Pengguna = require("./models/Pengguna"); // Sesuaikan dengan lokasi model Pengguna Anda
const Data = require("./models/Data"); // Sesuaikan dengan lokasi model Data Anda
const { authenticate, authorize } = require('../middleware/auth');
// Endpoint untuk mendapatkan semua pengguna
router.get("/", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const pengguna = await Pengguna.findAll({ include: Data });
    res.json(pengguna);
  } catch (err) {
    console.error("Error fetching pengguna:", err);
    res.status(500).json({ error: "Failed to fetch pengguna" });
  }
});

// Endpoint untuk mendapatkan pengguna berdasarkan userID
router.get("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const pengguna = await Pengguna.findByPk(id, { include: Data });
    if (!pengguna) {
      return res.status(404).json({ error: "Pengguna not found" });
    }
    res.json(pengguna);
  } catch (err) {
    console.error("Error fetching pengguna:", err);
    res.status(500).json({ error: "Failed to fetch pengguna" });
  }
});

// Endpoint untuk membuat pengguna baru
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  const { username, email, password, DataID } = req.body;
  try {
    const newPengguna = await Pengguna.create({ username, email, password, DataID });
    res.status(201).json(newPengguna);
  } catch (err) {
    console.error("Error creating pengguna:", err);
    res.status(500).json({ error: "Failed to create pengguna" });
  }
});

// Endpoint untuk memperbarui pengguna berdasarkan userID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const { username, email, password, DataID } = req.body;
  try {
    const penggunaToUpdate = await Pengguna.findByPk(id);
    if (!penggunaToUpdate) {
      return res.status(404).json({ error: "Pengguna not found" });
    }
    await penggunaToUpdate.update({ username, email, password, DataID });
    res.json(penggunaToUpdate);
  } catch (err) {
    console.error("Error updating pengguna:", err);
    res.status(500).json({ error: "Failed to update pengguna" });
  }
});

// Endpoint untuk menghapus pengguna berdasarkan userID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const penggunaToDelete = await Pengguna.findByPk(id);
    if (!penggunaToDelete) {
      return res.status(404).json({ error: "Pengguna not found" });
    }
    await penggunaToDelete.destroy();
    res.json({ message: "Pengguna deleted successfully" });
  } catch (err) {
    console.error("Error deleting pengguna:", err);
    res.status(500).json({ error: "Failed to delete pengguna" });
  }
});

module.exports = router;
