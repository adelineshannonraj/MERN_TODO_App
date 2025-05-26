const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // <- Add this!
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server Error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;