const db = require("../config/db");
const logAction = require("../utils/auditLogger");

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

      // AUDIT LOG
      logAction(req.user.name, "ADD", result.insertId);

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

  db.query("SELECT * FROM defects WHERE id = ?", [id], (err, oldRows) => {
    if (err) {
      return res.status(500).json(err);
    }

    const oldDefect = oldRows[0];

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

        const changes = [
          ["title", oldDefect.title, title],
          ["assignee", oldDefect.assignee, assignee],
          ["status", oldDefect.status, status],
          ["stage", oldDefect.stage, stage],
          ["environment", oldDefect.environment, environment],
          ["severity", oldDefect.severity, severity],
          ["tag", oldDefect.tag, tag],
          ["source", oldDefect.source, source],
          ["defectOwner", oldDefect.defectOwner, defectOwner],
          ["defectRelease", oldDefect.defectRelease, defectRelease],
        ];

        changes.forEach(([field, oldVal, newVal]) => {
          if ((oldVal || "") !== (newVal || "")) {
            db.query(
              `
                INSERT INTO defect_history
                (
                  defectId,
                  fieldName,
                  oldValue,
                  newValue,
                  changedBy
                )
                VALUES (?, ?, ?, ?, ?)
                `,
              [id, field, oldVal, newVal, req.user.name],
            );
          }
        });

        logAction(req.user.name, "UPDATE", id);

        res.json({
          message: "Defect Updated",
        });
      },
    );
  });
};

const deleteDefect = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM defects WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    // AUDIT LOG
    logAction(req.user.name, "DELETE", id);

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
