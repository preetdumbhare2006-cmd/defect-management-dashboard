const db = require("../config/db");

const getLogs = (req, res) => {
  db.query(
    `
    SELECT *
    FROM audit_logs
    ORDER BY createdAt DESC
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
};

module.exports = { getLogs };
