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

    return res.status(500).json({ error: 0 });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const adminUserList = async (req, res) => {
  const adminId = req.user.id;
  console.log(adminId);
  try {
    const [checkAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [adminId]
    );

    if (checkAdmin[0].is_admin == 1) {
      const [listOfUsers] = await pool.query(`SELECT 
        authentication.id, 
        authentication.email, 
        authentication.username, 
        authentication.name, 
        authentication.is_admin,
        profile.profile_image
        FROM authentication LEFT JOIN profile ON authentication.id = profile.user_id`);
      return res.status(200).json({ success: listOfUsers });
    }
    return res.status(500).json({ error: "You are not an admin." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const adminDeleteUser = async (req, res) => {
  const userId = req.params;
  const adminId = req.user.id;

  try {
    const [checkIfAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [adminId]
    );

    if (checkIfAdmin.is_admin === 1) {
      const [deleteUser] = await pool.query(
        `DELETE FROM authentication WHERE id = ?`,
        [userId]
      );

      return res.status(200).json({ success: "User Deleted" });
    }

    return res.status(500).json({ error: "You are not an Admin" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const suspendAdminUser = async (req, res) => {
  const userId = req.params;
  const adminId = req.user.id;

  try {
    const [checkIfAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [adminId]
    );

    if (checkIfAdmin.is_admin === 1) {
      const [checkVerification] = await pool.query(
        `SELECT is_verified FROM authentication WHERE id = ?`,
        [userId]
      );

      if (checkVerification === 1) {
        const [suspendUser] = await pool.query(
          `UPDATE authentication SET is_verified = ? WHERE id = ?`,
          [0, userId]
        );

        return res.status(200).json({ success: "Account suspended" });
      }

      if (checkVerification === 0) {
        const [unsuspendUser] = await pool.query(
          `UPDATE authentication SET is_verified = ? WHERE id = ?`,
          [1, userId]
        );
        return res.status(200).json({ success: "Account unsuspended" });
      }

      return res.status(500).json({ error: "You are not an Admin" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  adminChecker,
  adminUserList,
  adminDeleteUser,
  suspendAdminUser,
};
