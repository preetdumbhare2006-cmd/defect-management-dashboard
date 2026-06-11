const express = require("express");

const router = express.Router();

const { getAllDefects } = require("../controllers/defectsController");

router.get("/", getAllDefects);

module.exports = router;
