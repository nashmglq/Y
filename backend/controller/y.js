const pool = require("../config/connect");

const postY = async (req, res) => {
  const { tweet } = req.body;
  const tweet_img = req.file ? req.file.filename : null;
  const userId = req.user.id;
  console.log(req.file)
  console.log(req.body)

  try {
    const getUserId = await pool.query(
      "SELECT id from authentication WHERE id = ? ",
      [userId]
    );

    // checking if token and user id is okay
    if (getUserId === 0) {
      return res.status(500).json({ error: "No user found" });
    }

    if (!tweet) {
      return res.status(400).json({ error: "No text provided" });
    }

    const pushingTweet = await pool.query(
      "INSERT INTO tweets  (userId, tweet, img) VALUES (?, ?, ?) ",
      [userId, tweet, tweet_img]
    );

    return res.status(200).json({ success: "Success in posting" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getY = async (req, res) => {
  try {
    const [getTweets] = await pool.query(
      "SELECT authentication.id, authentication.username, profile.profile_image, tweets.tweet_id, tweets.tweet, tweets.img  FROM tweets LEFT JOIN profile ON tweets.userId = profile.user_id LEFT JOIN authentication ON profile.user_id = authentication.id"
    );

    if(getTweets.length === 0){
      return res.status(400).json({error: "Empty space."})
    }

    return res.status(200).json({
      success: {
        // u cannot create an object like this id : getTweets.id, becuase u are getting a lot
        getTweets
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getYDetails = async(req,res) =>{
  const {id} = req.params;

  try{

    if(!id){
      return res.status(400).json({error: "No ID recieve."})
    }

    console.log(id)
    const [getIdY] = await pool.query
    ("SELECT tweets.*, authentication.username, profile.profile_image FROM tweets LEFT JOIN authentication ON tweets.userId = authentication.id LEFT JOIN profile ON authentication.id = profile.user_id WHERE tweet_id = ? "
      , [id]
    )

    if(getIdY.length === 0){
      return res.status(404).json({error: "No ID found."})
    }
    console.log(getIdY)
    return res.status(200).json({success : 
      getIdY[0] // to remove []
    })


  }catch(err){
    return res.status(500).json({error: err.message})
  }
}

const updateY = async (req, res) => {
  const { updateTweet } = req.body;
  const { id } = req.params; // or cosnt tweet_id = req.params.id, the current jsut destructure the params
  const tokenId = req.user.id;
  
  console.log(id);
  try {
    if (!updateTweet) {
      return res.status(400).json({ error: "No tweet" });
    }

    const [checkId] = await pool.query(
      "SELECT tweet, tweet_id, userId from tweets WHERE tweet_id = ?",
      [id]
    );

    if (checkId[0].userId != tokenId) {
      return res.status(500).json({ err: "You are not the owner of this." });
    }

    if (checkId[0].tweet === updateTweet) {
      return res
        .status(500)
        .json({ err: "You cannot pass your current tweet" });
    }
    const updateUserTweet = await pool.query(
      "UPDATE tweets SET tweet = ? WHERE tweet_id = ?",
      [updateTweet, id]
    );

    return res.status(200).json({ success: "Tweet updated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteY = async (req, res) => {
  const tokenId = req.user.id;
  const tweet_id = req.params.id;

  try {
    if (!tweet_id) {
      return res.status(400).json({ error: "No id found" });
    }

    const [checkId] = await pool.query(
      "SELECT userId FROM tweets WHERE tweet_id = ?",
      [tweet_id]
    );

    if (checkId[0].userId !== tokenId) {
      return res
        .status(500)
        .json({ error: "You are not the owner of this tweet" });
    }

    const deleteTweet = await pool.query(
      "DELETE FROM tweets WHERE tweet_id = ?",
      [tweet_id]
    );

    return res.status(200).json({ success: "Successfully Deleted" });
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
};

module.exports = { postY, getY, getYDetails, updateY, deleteY };
