const pool = require("../config/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const emailSender = require("../config/util");
const { userInfo } = require("os");
const { error } = require("console");

const registerUser = async (req, res) => {
  const { email, username, password, password2 } = req.body;
  console.log("trigger");

  try {
    if (!email || !username || !password || !password2) {
      return res.status(400).json({ error: "Please input all fields" });
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
      "SELECT email FROM authentication WHERE  email = ?",
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

    return res
      .status(200)
      .json({ success: "Please check your email for email verification" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please input all fields" });
    }

    const [checkUser] = await pool.query(
      "SELECT username, id,password, is_verified FROM authentication WHERE email = ?",
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
        { email: email, username: checkUser[0].username, id: checkUser[0].id },
        process.env.jwt_secret,
        { expiresIn: "1hr" }
      );

      console.log(req.header);
      return res.status(200).json({
        success: {
          userInfo: {
            token: token,
            email: checkUser[0].email,
            username: checkUser[0].username,
            id: checkUser[0].id,
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

  try {
    if (!token) {
      return res.status(400).json({ error: "Invalid Link" });
    }

    const [findToken] = await pool.query(
      "SELECT id, email, is_verified, verif_expiration FROM authentication WHERE verif_token = ?",
      [token]
    );

    if (findToken.length === 0) {
      return res.status(500).json({ error: "Invalid Link" });
    }

    if (!findToken[0].id) {
      return res.status(500).json({ error: "Invalid Link" });
    }

    if (findToken[0].is_verified === 1) {
      return res.status(500).json({ error: "Invalid Link" });
    }

    if (Date.now() > findToken[0].verif_expiration) {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resendEmailVerification = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Please add an email" });
    }

    const [checkEmail] = await pool.query(
      "SELECT id, is_verified FROM authentication WHERE email = ?",
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPeople = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!userId) {
      return res.status(500).json({ error: "No ID found." });
    }

    //Adding [] will get the first element from the result set.

    const [getUser] = await pool.query(
      // LEFT JOIN means join profile with authentication base on the id and if there is no profile it will be null OR VICE VERSA
      "SELECT authentication.id, authentication.email, authentication.username, profile.bio, profile.profile_image  FROM authentication LEFT JOIN profile ON authentication.id = profile.user_id WHERE id = ? ",
      [userId]
    );

    if (getUser.length === 0) {
      return res.status(400).json({ error: "No user found" });
    }

    return res.status(200).json({
      success: {
        userInfo: {
          email: getUser[0].email,
          id: getUser[0].id,
          username: getUser[0].username,
          bio: getUser[0].bio,
          profile_image: getUser[0].profile_image,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  // destructure to get the values
  const { username, bio } = req.body;
  // to be unique, pick the filename, no need destructure because we are not getting any values, we only pick
  // take body, when initial is being passed
  const profile_image = req.file ? req.file.filename : req.body.profile_image;
  const userId = req.user.id;

  console.log(req.body);
  console.log(profile_image)

  try {
    if (!username || !bio || !profile_image) {
      return res.status(400).json({ error: "Please input all fields" });
    }

    // left join, find rows that equal to the id (or other base on the developer) if there is no data, return null (either) which prevent errors
    const getuserId = await pool.query(
      "SELECT authentication.id ,authentication.username, profile.bio, profile.profile_image from authentication LEFT JOIN profile ON authentication.id = profile.user_id WHERE id = ? ",
      [userId]
    );

    // lenght starts with 1 and not 0, though array starts with 0
    if (getuserId.length === 0) {
      return res.status(404).json({ error: "No user foundd" });
    }

    const updateUsername = await pool.query(
      "UPDATE authentication SET username = ? WHERE id = ? ",
      [username, userId]
    );
    const updateBioProfileImg = await pool.query(
      "UPDATE profile SET bio = ?, profile_image = ? WHERE user_id = ?",
      [bio, profile_image, userId]
    );

    return res.status(200).json({ success: "Updated Successfully" });
  } catch (err) {
    //err (provide message,stack,name etc) and we only want the message
    return res.status(500).json({ error: err.message });
  }
};



module.exports = {
  registerUser,
  login,
  verifyEmail,
  resendEmailVerification,
  getPeople,
  updateProfile,
};