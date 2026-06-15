const db = require("../config/db");

const getAllDefects = (req, res) => {
  db.query("SELECT * FROM defects", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.status(200).json(result);
  });
};
const addDefect = (req, res) => {
  const {
    title,
    assignee,
    status,
    stage,
    environment,
    severity,
    tag,
    source,
    defectOwner,
    defectRelease,
  } = req.body;

  const sql = `
    INSERT INTO defects
    (
      title,
      assignee,
      status,
      stage,
      environment,
      severity,
      tag,
      source,
      defectOwner,
      defectRelease
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      assignee,
      status,
      stage,
      environment,
      severity,
      tag,
      source,
      defectOwner,
      defectRelease,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Insert Failed",
        });
      }

      res.status(201).json({
        message: "Defect Added",
        id: result.insertId,
      });
    },
  );
};
const updateDefect = (req, res) => {
  const { id } = req.params;

  const {
    title,
    assignee,
    status,
    stage,
    environment,
    severity,
    tag,
    source,
    defectOwner,
    defectRelease,
  } = req.body;

  const sql = `
    UPDATE defects
    SET
      title = ?,
      assignee = ?,
      status = ?,
      stage = ?,
      environment = ?,
      severity = ?,
      tag = ?,
      source = ?,
      defectOwner = ?,
      defectRelease = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title,
      assignee,
      status,
      stage,
      environment,
      severity,
      tag,
      source,
      defectOwner,
      defectRelease,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Defect Updated",
      });
    },
  );
};
const deleteDefect = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM defects WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Deleted Successfully",
    });
  });
};

module.exports = {
  getAllDefects,
  addDefect,
  updateDefect,
  deleteDefect,
};
