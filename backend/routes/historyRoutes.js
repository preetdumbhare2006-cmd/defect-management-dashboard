const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const { getDefectHistory } = require("../controllers/historyController");

router.get("/:id", verifyToken, getDefectHistory);

module.exports = router;
