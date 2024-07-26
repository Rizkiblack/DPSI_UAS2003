const express = require("express");
const router = express.Router();
const Rumah_adat = require("./models/Rumah_adat"); // Sesuaikan dengan lokasi model Rumah_adat Anda
const Data = require("./models/Data"); // Sesuaikan dengan lokasi model Data Anda
const { authenticate, authorize } = require('../middleware/auth');
// Endpoint untuk mendapatkan semua rumah_adat
router.get("", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const rumah_adat = await Rumah_adat.findAll({ include: Data });
    res.json(rumah_adat);
  } catch (err) {
    console.error("Error fetching rumah_adat:", err);
    res.status(500).json({ error: "Failed to fetch rumah_adat" });
  }
});

// Endpoint untuk mendapatkan rumah_adat berdasarkan adatID
router.get("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const rumah_adat = await Rumah_adat.findByPk(id, { include: Data });
    if (!rumah_adat) {
      return res.status(404).json({ error: "Rumah_adat not found" });
    }
    res.json(rumah_adat);
  } catch (err) {
    console.error("Error fetching rumah_adat:", err);
    res.status(500).json({ error: "Failed to fetch rumah_adat" });
  }
});

// Endpoint untuk membuat rumah_adat baru
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  const { detail, gambar, DataID } = req.body;
  try {
    const newRumah_adat = await Rumah_adat.create({ detail, gambar, DataID });
    res.status(201).json(newRumah_adat);
  } catch (err) {
    console.error("Error creating rumah_adat:", err);
    res.status(500).json({ error: "Failed to create rumah_adat" });
  }
});

// Endpoint untuk memperbarui rumah_adat berdasarkan adatID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const { detail, gambar, DataID } = req.body;
  try {
    const rumah_adatToUpdate = await Rumah_adat.findByPk(id);
    if (!rumah_adatToUpdate) {
      return res.status(404).json({ error: "Rumah_adat not found" });
    }
    await rumah_adatToUpdate.update({ detail, gambar, DataID });
    res.json(rumah_adatToUpdate);
  } catch (err) {
    console.error("Error updating rumah_adat:", err);
    res.status(500).json({ error: "Failed to update rumah_adat" });
  }
});

// Endpoint untuk menghapus rumah_adat berdasarkan adatID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const rumah_adatToDelete = await Rumah_adat.findByPk(id);
    if (!rumah_adatToDelete) {
      return res.status(404).json({ error: "Rumah_adat not found" });
    }
    await rumah_adatToDelete.destroy();
    res.json({ message: "Rumah_adat deleted successfully" });
  } catch (err) {
    console.error("Error deleting rumah_adat:", err);
    res.status(500).json({ error: "Failed to delete rumah_adat" });
  }
});

module.exports = router;
