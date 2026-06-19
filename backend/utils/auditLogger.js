const db = require("../config/db");

const logAction = (userName, actionType, defectId) => {
  const sql = `
    INSERT INTO audit_logs
    (userName, actionType, defectId)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userName, actionType, defectId]);
};

module.exports = logAction;
