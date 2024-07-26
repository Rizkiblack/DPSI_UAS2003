const express = require("express");
const router = express.Router();
const Makanan = require("./models/Makanan"); // Sesuaikan dengan lokasi model Makanan Anda
const Data = require("./models/Data"); // Sesuaikan dengan lokasi model Data Anda
const { authenticate, authorize } = require('../middleware/auth');
// Endpoint untuk mendapatkan semua makanan
router.get("/", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const makanan = await Makanan.findAll({ include: Data });
    res.json(makanan);
  } catch (err) {
    console.error("Error fetching makanan:", err);
    res.status(500).json({ error: "Failed to fetch makanan" });
  }
});

// Endpoint untuk mendapatkan makanan berdasarkan makananID
router.get("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const makanan = await Makanan.findByPk(id, { include: Data });
    if (!makanan) {
      return res.status(404).json({ error: "Makanan not found" });
    }
    res.json(makanan);
  } catch (err) {
    console.error("Error fetching makanan:", err);
    res.status(500).json({ error: "Failed to fetch makanan" });
  }
});

// Endpoint untuk membuat makanan baru
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  const { nama, gambar, detail, DataID } = req.body;
  try {
    const newMakanan = await Makanan.create({ nama, gambar, detail, DataID });
    res.status(201).json(newMakanan);
  } catch (err) {
    console.error("Error creating makanan:", err);
    res.status(500).json({ error: "Failed to create makanan" });
  }
});

// Endpoint untuk memperbarui makanan berdasarkan makananID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const { nama, gambar, detail, DataID } = req.body;
  try {
    const makananToUpdate = await Makanan.findByPk(id);
    if (!makananToUpdate) {
      return res.status(404).json({ error: "Makanan not found" });
    }
    await makananToUpdate.update({ nama, gambar, detail, DataID });
    res.json(makananToUpdate);
  } catch (err) {
    console.error("Error updating makanan:", err);
    res.status(500).json({ error: "Failed to update makanan" });
  }
});

// Endpoint untuk menghapus makanan berdasarkan makananID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const makananToDelete = await Makanan.findByPk(id);
    if (!makananToDelete) {
      return res.status(404).json({ error: "Makanan not found" });
    }
    await makananToDelete.destroy();
    res.json({ message: "Makanan deleted successfully" });
  } catch (err) {
    console.error("Error deleting makanan:", err);
    res.status(500).json({ error: "Failed to delete makanan" });
  }
});

module.exports = router;
