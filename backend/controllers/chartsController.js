const db = require("../config/db");
const defects = [];

const getSeverityChart = (req, res) => {
  const sql = `
    SELECT severity AS subject,
           COUNT(*) AS value
    FROM defects
    GROUP BY severity
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};


const getEnvironmentChart = (req, res) => {
  const sql = `
    SELECT environment AS name,
           COUNT(*) AS value
    FROM defects
    GROUP BY environment
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

const getSourceChart = (req, res) => {
  const sql = `
    SELECT source AS name,
           COUNT(*) AS value
    FROM defects
    GROUP BY source
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
const getTagsChart = (req, res) => {
  const sql = `
    SELECT tag,
           COUNT(*) AS value
    FROM defects
    GROUP BY tag
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
const getWorkflowPulseChart = (req, res) => {
  const sql = `
    SELECT stage AS name,
           COUNT(*) AS value
    FROM defects
    GROUP BY stage
    ORDER BY value DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
const getAssignedToChart = (req, res) => {
  const sql = `
    SELECT assignee AS name,
           COUNT(*) AS value
    FROM defects
    GROUP BY assignee
    ORDER BY value DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
const getAddedByChart = (req, res) => {
  const sql = `
    SELECT defectOwner AS name,
           COUNT(*) AS value
    FROM defects
    GROUP BY defectOwner
    ORDER BY value DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
const getAttentionRequiredChart = (req, res) => {
  const sql = `
    SELECT severity AS name,
           COUNT(*) AS value
    FROM defects
    GROUP BY severity
    ORDER BY value DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};
const getAgingChart = (req, res) => {
  const chartData = [
    { name: "0-2 days", value: 5 },
    { name: "3-7 days", value: 15 },
    { name: "7+ days", value: 31 },
  ];

  res.json(chartData);
};
module.exports = {
  getSeverityChart,
  getEnvironmentChart,
  getSourceChart,
  getTagsChart,
  getWorkflowPulseChart,
  getAssignedToChart,
  getAddedByChart,
  getAttentionRequiredChart,
  getAgingChart,
};
