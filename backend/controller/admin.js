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
        authentication.is_verified,
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
  const userId = req.params.id;
  const adminId = req.user.id;
  console.log(userId);

  try {
    const [checkIfAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [adminId]
    );

    if (checkIfAdmin[0].is_admin === 1) {
      const [deleteUser] = await pool.query(
        `DELETE FROM authentication WHERE id = ?`,
        [userId]
      );

      console.log(deleteUser);

      return res.status(200).json({ success: "User Deleted" });
    }

    return res.status(500).json({ error: "You are not an Admin" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const suspendAdminUser = async (req, res) => {
  const userId = req.params.id;
  const adminId = req.user.id;

  try {
    const [checkIfAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [adminId]
    );

    if (checkIfAdmin[0].is_admin === 1) {
      const [checkVerification] = await pool.query(
        `SELECT is_verified FROM authentication WHERE id = ?`,
        [userId]
      );

      if (checkVerification[0].is_verified === 1) {
        const [suspendUser] = await pool.query(
          `UPDATE authentication SET is_verified = ? WHERE id = ?`,
          [0, userId]
        );

        return res.status(200).json({ success: "Account suspended" });
      }

      if (checkVerification[0].is_verified === 0) {
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

const searchUserAdmin = async (req, res) => {
  const userId = req.params.id;
  const adminId = req.user.id;
  const { query } = req.body;
  console.log(query)
  try {
    const [checkIfAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [adminId]
    );

    if (!query)
      return res.status(200).json({ success: "No user with that email" });

    if (checkIfAdmin[0].is_admin === 0)
      return res.status(500).json({ error: "You are not an Admin" });

    const [queryDb] = await pool.query(
      `SELECT 
        authentication.id, 
        authentication.email, 
        authentication.username, 
        authentication.name, 
        authentication.is_admin,
        authentication.is_verified,
        profile.profile_image
        FROM authentication
        LEFT JOIN profile ON authentication.id = profile.user_id
        WHERE authentication.email LIKE ? OR authentication.username LIKE ?
        `
    , [`%${query}%`, `%${query}%`]);




    return res.status(200).json({ success: queryDb });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const setAdmin = async (req, res) => {
  const adminId = req.user.id;
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ error: "No ID found." });
    const [checkIfAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [adminId]
    );

    if (checkIfAdmin[0].is_admin === 0)
      return res.status(500).json({ error: "You are not an Admin" });

    const [checkUserStatus] = await pool.query(`SELECT is_admin from authentication WHERE id = ?`, [id])

    if(checkUserStatus[0].is_admin === 0) {
      const [updateAdmin] = await pool.query(
        `UPDATE authentication SET is_admin = 1 WHERE id = ?`,
        [id]
      );
      return res.status(200).json({success: "Added admin rights"})
    }

    
    if(checkUserStatus[0].is_admin === 1) {
      const [updateAdmin] = await pool.query(
        `UPDATE authentication SET is_admin = 0 WHERE id = ?`,
        [id]
      );
      return res.status(200).json({success: "Removed admin rights"})
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
  searchUserAdmin,
  setAdmin,
};
