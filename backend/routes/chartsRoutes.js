const express = require("express");

const router = express.Router();


const {
  getSeverityChart,
  getEnvironmentChart,
  getSourceChart,
  getTagsChart,
  getWorkflowPulseChart,
  getAssignedToChart,
  getAddedByChart,
  getAttentionRequiredChart,
  getAgingChart,
} = require("../controllers/chartsController");

router.get("/severity", getSeverityChart);
router.get("/environment", getEnvironmentChart);
router.get("/source", getSourceChart);
router.get("/tags", getTagsChart);
router.get("/workflow-pulse", getWorkflowPulseChart);
router.get("/assigned-to", getAssignedToChart);
router.get("/added-by", getAddedByChart);
router.get("/attention-required", getAttentionRequiredChart);
router.get("/aging", getAgingChart);
module.exports = router;
