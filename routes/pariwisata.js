const express = require("express");
const router = express.Router();
const Pariwisata = require("./models/Pariwisata"); // Sesuaikan dengan lokasi model Pariwisata Anda
const Data = require("./models/Data"); // Sesuaikan dengan lokasi model Data Anda
const { authenticate, authorize } = require('../middleware/auth');
// Endpoint untuk mendapatkan semua pariwisata
router.get("/", authenticate, authorize(['admin']),async (req, res) => {
  try {
    const pariwisata = await Pariwisata.findAll({ include: Data });
    res.json(pariwisata);
  } catch (err) {
    console.error("Error fetching pariwisata:", err);
    res.status(500).json({ error: "Failed to fetch pariwisata" });
  }
});

// Endpoint untuk mendapatkan pariwisata berdasarkan alamatID
router.get("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const pariwisata = await Pariwisata.findByPk(id, { include: Data });
    if (!pariwisata) {
      return res.status(404).json({ error: "Pariwisata not found" });
    }
    res.json(pariwisata);
  } catch (err) {
    console.error("Error fetching pariwisata:", err);
    res.status(500).json({ error: "Failed to fetch pariwisata" });
  }
});

// Endpoint untuk membuat pariwisata baru
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  const { detail, gambar, DataID } = req.body;
  try {
    const newPariwisata = await Pariwisata.create({ detail, gambar, DataID });
    res.status(201).json(newPariwisata);
  } catch (err) {
    console.error("Error creating pariwisata:", err);
    res.status(500).json({ error: "Failed to create pariwisata" });
  }
});

// Endpoint untuk memperbarui pariwisata berdasarkan alamatID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const { detail, gambar, DataID } = req.body;
  try {
    const pariwisataToUpdate = await Pariwisata.findByPk(id);
    if (!pariwisataToUpdate) {
      return res.status(404).json({ error: "Pariwisata not found" });
    }
    await pariwisataToUpdate.update({ detail, gambar, DataID });
    res.json(pariwisataToUpdate);
  } catch (err) {
    console.error("Error updating pariwisata:", err);
    res.status(500).json({ error: "Failed to update pariwisata" });
  }
});

// Endpoint untuk menghapus pariwisata berdasarkan alamatID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const pariwisataToDelete = await Pariwisata.findByPk(id);
    if (!pariwisataToDelete) {
      return res.status(404).json({ error: "Pariwisata not found" });
    }
    await pariwisataToDelete.destroy();
    res.json({ message: "Pariwisata deleted successfully" });
  } catch (err) {
    console.error("Error deleting pariwisata:", err);
    res.status(500).json({ error: "Failed to delete pariwisata" });
  }
});

module.exports = router;
