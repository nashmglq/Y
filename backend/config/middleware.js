const jwt = require("jsonwebtoken");
const multer = require("multer");

const authenticatorChecker = (req, res, next) => {
  // split all the spaces (" ") and get the 1 index
  // if we use ("") then it will split the single char
  // "?" is when Authorization is null or empty and it will = undefined
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    if (!token) {
      return res.status(400).json({ error: "You are not authenticated" });
    }

    // verify the signature or jwt_secret
    const compareSignature = jwt.verify(token, process.env.jwt_secret);
    

    // manually setting this ( this is not a built-in of EXPRESS OR  NODE)
    req.user = compareSignature;
    // console.log(compareSignature)
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  // use +, because using "," will just make it skip
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = { authenticatorChecker, upload };
