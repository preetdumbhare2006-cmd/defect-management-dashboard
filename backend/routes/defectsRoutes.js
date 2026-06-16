const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

const {
  getAllDefects,
  addDefect,
  updateDefect,
  deleteDefect,
} = require("../controllers/defectsController");

router.get("/", verifyToken, getAllDefects);

router.post("/", verifyToken, verifyAdmin, addDefect);

router.put("/:id", verifyToken, verifyAdmin, updateDefect);

router.delete("/:id", verifyToken, verifyAdmin, deleteDefect);

module.exports = router;
