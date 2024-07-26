const express = require("express");
const router = express.Router();
const Data = require("./models/Data"); // Sesuaikan dengan lokasi model Data Anda
const Admin = require("./models/Admin"); // Sesuaikan dengan lokasi model Admin Anda
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk mendapatkan semua data
router.get("/", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const data = await Data.findAll({ include: Admin });
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Endpoint untuk mendapatkan data berdasarkan DataID
router.get("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Data.findByPk(id, { include: Admin });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Endpoint untuk membuat data baru
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  const { menambah, mengurangi, AdminID } = req.body;
  try {
    const newData = await Data.create({ menambah, mengurangi, AdminID });
    res.status(201).json(newData);
  } catch (err) {
    console.error("Error creating data:", err);
    res.status(500).json({ error: "Failed to create data" });
  }
});

// Endpoint untuk memperbarui data berdasarkan DataID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const { menambah, mengurangi, AdminID } = req.body;
  try {
    const dataToUpdate = await Data.findByPk(id);
    if (!dataToUpdate) {
      return res.status(404).json({ error: "Data not found" });
    }
    await dataToUpdate.update({ menambah, mengurangi, AdminID });
    res.json(dataToUpdate);
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).json({ error: "Failed to update data" });
  }
});

// Endpoint untuk menghapus data berdasarkan DataID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const dataToDelete = await Data.findByPk(id);
    if (!dataToDelete) {
      return res.status(404).json({ error: "Data not found" });
    }
    await dataToDelete.destroy();
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ error: "Failed to delete data" });
  }
});

module.exports = router;
