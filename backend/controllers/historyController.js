const db = require("../config/db");

const getDefectHistory = (req, res) => {
  const { id } = req.params;

  db.query(
    `
    SELECT *
    FROM defect_history
    WHERE defectId = ?
    ORDER BY createdAt DESC
    `,
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
};

module.exports = {
  getDefectHistory,
};
