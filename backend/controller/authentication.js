const pool = require("../config/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const emailSender = require("../config/util");

const registerUser = async (req, res) => {
  const { email, username, password, password2 } = req.body;

  try {
    if (!email || !username || !password || !password2) {
      return res.status(500).json({ error: "Please input all fields" });
    }

    if (password.length < 8 || password2.length < 8) {
      return res
        .status(500)
        .json({ error: "Password is too short, 8 or more characters please" });
    }

    if (password !== password2) {
      return res.status(400).json({ error: "Password do not match" });
    }

    const [checkEmail] = await pool.query(
      "SELECT * FROM authentication WHERE  email = ?",
      [email]
    );

    if (checkEmail.length > 0) {
      return res.status(500).json({ error: "Email is already used" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex"); // get the 20 bytes and turn into hexadecimals
    const verificationExpiration = Date.now() + 3600 * 10; // ms is being used

    // pool.query (key.execute)
    const registerUser = await pool.query(
      "INSERT INTO authentication (email, username, password, verif_token, verif_expiration) VALUES (?, ?, ?, ?, ?)",
      [email, username, hashPassword, verificationToken, verificationExpiration]
    );

    await emailSender(email, verificationToken);

    return res.status(200).json({ success: "Please check your email for email verification" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(500).json({ error: "Please input all fields" });
    }

    const [checkUser] = await pool.query(
      "SELECT * FROM authentication WHERE email = ?",
      [email]
    );

    if (checkUser.length === 0) {
      return res
        .status(404)
        .json({ error: "User is not yet registered on our records" });
    }
    const compareHash = await bcrypt.compare(password, checkUser[0].password);

    if (compareHash && checkUser[0].is_verified === 1) {
      const token = jwt.sign(
        { email: email, username: checkUser[0].username },
        process.env.jwt_secret,
        { expiresIn: "1hr" }
      );

      return res.status(200).json({
        success: {
          userInfo: {
            token: token,
            email: checkUser[0].email,
            username: checkUser[0].username,
          },
        },
      });
    } else {
      return res
        .status(500)
        .json({ error: "Password is incorrect or Email is not yet verified" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query; // params = / and query = ?
  console.log(token);

  if (!token) {
    return res.status(500).json({ error: "Invalid Link" });
  }

  const [findToken] = await pool.query(
    "SELECT * FROM authentication WHERE verif_token = ?",
    [token]
  );

  if (findToken.length === 0) {
    return res.status(500).json({ error: "Invalid Link" });
  }

  if (findToken[0].is_verified === 1) {
    return res.status(500).json({ error: "Invalid Link" });
  }

  const [verifyEmail] = await pool.query(
    "UPDATE authentication SET is_verified = true WHERE id = ?",
    [findToken[0].id]
  );
  console.log(findToken[0]);
  return res
    .status(200)
    .json({ success: `Email verified for: ${findToken[0].email}` });
};

const resendEmailVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(500).json({ error: "Please add an email" });
  }

  const [checkEmail] = await pool.query(
    "SELECT * FROM authentication WHERE email = ?",
    [email]
  );

  if (checkEmail.length === 0) {
    return res.status(400).json({ error: "Email not found" });
  }

  if (checkEmail[0].is_verified === 1) {
    return res.status(400).json({ error: "Email is already verified" });
  }

  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationExpiration = Date.now() + 3600 * 10;

  const [updateVerification] = await pool.query(
    "UPDATE authentication SET verif_token = ?, verif_expiration = ? WHERE id = ?",
    [verificationToken, verificationExpiration, checkEmail[0].id]
  );

  await emailSender(email, verificationToken);

  return res
    .status(200)
    .json({ success: "Email verification sent! Please check your email." });
};

module.exports = { registerUser, login, verifyEmail, resendEmailVerification };
