const express = require("express");

const router = express.Router();

const {
  getAllDefects,
  addDefect,
  updateDefect,
  deleteDefect,
} = require("../controllers/defectsController");

router.get("/", getAllDefects);
router.post("/", addDefect);
router.put("/:id", updateDefect);
router.delete("/:id", deleteDefect);

module.exports = router;
