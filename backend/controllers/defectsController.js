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

module.exports = {
  getAllDefects,
};
