const pool = require("../config/connect");
const adminChecker = async (req, res) => {
  const adminId = req.user.id;
  try {
    if (!adminId)
      return res.status(400).json({ error: "No ID found of this user." });

    const [getIsAdmin] = await pool.query(
      `SELECT is_admin from authentication WHERE id = ?`,
      [adminId]
    );

    if (getIsAdmin[0].is_admin === 1)
      return res.status(200).json({ success: 1 });

    return res.status(500).json({ error: 0});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { adminChecker };
