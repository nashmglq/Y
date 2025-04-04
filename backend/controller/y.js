const pool = require("../config/connect");

const postY = async (req, res) => {
  const { tweet } = req.body;
  const tweet_img = req.file ? req.file.filename : null;
  const userId = req.user.id;

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
  const userId = req.user.id;
  try {
    console.log(userId);
    const [getTweets] = await pool.query(
      `
      SELECT 
        authentication.id, 
        authentication.username, 
        authentication.name, 
        profile.profile_image, 
        tweets.tweet_id, 
        tweets.tweet, 
        tweets.img, 
        tweets.date_published, 
        tweets.updated, 
        tweets.heart, 
        CASE 
          WHEN EXISTS(
            SELECT 1 
            FROM likedid
            WHERE likedid.userId = ? AND likedid.tweet_id = tweets.tweet_id
          )THEN 1
          ELSE 0
          END AS isLiked
      FROM tweets 
      LEFT JOIN profile ON tweets.userId = profile.user_id 
      LEFT JOIN authentication ON profile.user_id = authentication.id 
      ORDER BY tweets.date_published DESC
    `,
      [userId]
    );

    if (getTweets.length === 0) {
      return res.status(400).json({ error: "Empty space." });
    }

    return res.status(200).json({
      success: getTweets,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getYDetails = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "No ID recieve." });
    }

    const [getIdY] = await pool.query(
      `SELECT tweets.*, authentication.id, authentication.username, authentication.name, authentication.is_admin, profile.profile_image 
      FROM tweets LEFT JOIN authentication ON 
      tweets.userId = authentication.id LEFT JOIN profile ON authentication.id = profile.user_id 
      WHERE tweet_id = ? `,
      [id]
    );

    if (getIdY.length === 0) {
      return res.status(404).json({ error: "No ID found." });
    }
    return res.status(200).json({
      success: getIdY[0],
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateY = async (req, res) => {
  const { updateTweet } = req.body;
  const { id } = req.params; // or cosnt tweet_id = req.params.id, the current jsut destructure the params
  const tokenId = req.user.id;

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
      "UPDATE tweets SET tweet = ?, updated = 1 WHERE tweet_id = ?",
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
    const [checkYId] = await pool.query(
      `SELECT tweet_id from tweets WHERE tweet_id = ?`,
      [tweet_id]
    );

    if (!tweet_id || checkYId === 0) {
      return res.status(400).json({ error: "No id found" });
    }

    const [checkId] = await pool.query(
      "SELECT tweets.userId, authentication.is_admin FROM tweets LEFT JOIN authentication ON tweets.userId = authentication.id WHERE tweet_id = ?",
      [tweet_id]
    );

    const [checkAdmin] = await pool.query(
      `SELECT is_admin FROM authentication WHERE id = ?`,
      [tokenId]
    );
    console.log(checkAdmin[0].is_admin);
    if (checkId[0].userId === tokenId || checkAdmin[0].is_admin === 1) {
      const deleteTweet = await pool.query(
        "DELETE FROM tweets WHERE tweet_id = ?",
        [tweet_id]
      );

      return res.status(200).json({ success: "Successfully Deleted" });
    }

    return res
      .status(500)
      .json({ error: "You are not the owner of this tweet" });
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
};

const updateLike = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    if (!id || !userId) {
      return res.status(500).json({ error: "No Id found" });
    }

    const [getTweet_id] = await pool.query(
      "SELECT tweet_id from tweets WHERE tweet_id = ?",
      [id]
    );

    if (getTweet_id.length === 0)
      return res.status(404).json({ error: "Tweet not found" });

    const [checker] = await pool.query(
      "SELECT * from likedId WHERE userId = ? AND tweet_id = ?",
      [userId, id]
    );

    // to unlike
    if (checker.length > 0) {
      const checkerForNegative = await pool.query(
        "SELECT heart from tweets WHERE tweet_id = ?",
        [id]
      );

      if (checkerForNegative[0].heart < 0) {
        return res.status(500).json({ error: "Cannot be negative" });
      }

      const minusLike = await pool.query(
        "UPDATE tweets SET heart = heart - 1 WHERE tweet_id = ?",
        [id]
      );
      const deleteId = await pool.query(
        "DELETE from likedId WHERE userId= ? AND tweet_id = ?",
        [userId, id]
      );
      return res.status(200).json({ success: "Unliked success" });
    }

    if (checker.length === 0) {
      const insertForCheck = await pool.query(
        "INSERT INTO likedId (userId, tweet_id) VALUES (?,?)",
        [userId, id]
      );

      const addLike = await pool.query(
        "UPDATE tweets SET heart = heart + 1 WHERE tweet_id = ?",
        [id]
      );
      return res.status(200).json({ success: "Added like" });
    }
  } catch (err) {
    return res.status(500).status({ error: err.message });
  }
};

const getUserY = async (req, res) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return res.status(400).json({ success: "No ID found" });
    }

    const [getuserY] = await pool.query(
      `SELECT 
      authentication.id, 
      authentication.username, 
      authentication.name, 
      profile.profile_image, 
      tweets.*, 
      CASE 
        WHEN EXISTS (
          SELECT 1 
          FROM likedid 
          WHERE likedid.userId = ? AND likedid.tweet_id = tweets.tweet_id
        ) THEN 1 
        ELSE 0 
      END AS isLiked
    FROM authentication 
    LEFT JOIN profile ON authentication.id = profile.user_id 
    LEFT JOIN tweets ON profile.user_id = tweets.userId 
    WHERE authentication.id = ? 
    ORDER BY tweets.date_published DESC`,
      [userId, userId]
    );
    // no need to get the left join of the likedid because we are not letting it on the query
    // we just used it for the if else

    if (getuserY[0].tweet_id === null) {
      return res.status(400).json({ error: "No tweet yet." });
    }

    return res.status(200).json({ success: getuserY });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getOtherY = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    if (!id) {
      return res.status(400).json({ success: "No ID found" });
    }

    const [getuserY] = await pool.query(
      `SELECT 
      authentication.id, 
      authentication.username, 
      authentication.name, 
      profile.profile_image, 
      tweets.*,
      CASE
        WHEN EXISTS(
        SELECT 1
        FROM likedid
        WHERE likedid.userId = ? AND likedid.tweet_id = tweets.tweet_id 
        ) THEN 1
        ELSE 0
      END AS isLiked
      from authentication 
      LEFT JOIN profile ON authentication.id = profile.user_id 
      LEFT JOIN tweets ON profile.user_id = tweets.userId 
      WHERE id = ? 
      ORDER BY tweets.date_published DESC`,
      [userId, id]
    );

    if (getuserY[0].tweet_id === null) {
      return res.status(400).json({ error: "No tweets yet." });
    }
    return res.status(200).json({ success: getuserY });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getCountOfLikes = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "No ID found" });
    }
    // access success.heart
    const [getLike] = await pool.query(
      "SELECT heart FROM tweets WHERE tweet_id = ?",
      [id]
    );
    return res.status(200).json({ success: getLike });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// connect it later prioritize the like first
const postComment = async (req, res) => {
  const { comment } = req.body;
  const userId = req.user.id;
  const { id } = req.params;

  try {
    if (!comment || !userId || !id) {
      return res.status(400).json({ error: "No comment added" });
    }

    const postComment = await pool.query(
      "INSERT INTO comments (comment, tweetId ,userId) VALUES (?,?, ?)",
      [comment, id, userId]
    );

    return res.status(200).json({ success: "Comment Success" });
  } catch (err) {
    return res.status(500).json({ error: err.mesage });
  }
};

const getComments = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(400).json({ error: "No ID found." });

    const [getComment] = await pool.query(
      `SELECT authentication.id, authentication.name, authentication.username, profile.profile_image, comments.* from comments 
      LEFT JOIN authentication ON comments.userId = authentication.id 
      LEFT JOIN profile ON authentication.id = profile.user_id
      WHERE tweetId = ?
      ORDER BY 
      comments.date_published DESC`,
      [id]
    );

    if (getComment.length === 0) {
      return res.status(200).json({ success: "No comment yet" });
    }

    return res.status(200).json({ success: getComment });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteComments = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    if (!id) return res.status(400).json({ error: "No ID FOUND" });

    const [getComment] = await pool.query(
      `SELECT * from comments WHERE comment_id = ?`,
      [id]
    );
    const [checkAdmin] = await pool.query(
      `SELECT is_admin from authentication WHERE id = ?`,
      userId
    );

    if (getComment.length === 0) {
      return res.status(400).json({ error: "No tweet found" });
    }

    if ((getComment[0].userId = userId || checkAdmin[0].id == userId)) {
      const [deleteComment] = await pool.query(
        "DELETE from comments WHERE comment_id = ?",
        id
      );

      return res.status(200).json({ success: "Successfully deleted" });
    }

    return res.status(500).json({ error: "You are not the owner of this Y" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateComments = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  console.log(req.body);
  console.log(comment);
  try {
    if (!id) return res.status(400).json({ err });

    const [getComment] = await pool.query(
      `SELECT * from comments WHERE comment_id = ?`,
      [id]
    );

    if (getComment.length === 0) {
      return res.status(400).json({ error: "No tweet found" });
    }

    if (getComment[0].comment == comment) {
      return res
        .status(400)
        .json({ error: "You cannot put your current comment" });
    }

    const [updateComment] = await pool.query(
      `UPDATE comments SET comment = ?, updated = 1 WHERE comment_id = ?`,
      [comment, id]
    );

    return res.status(200).json({ success: "Updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const repostY = async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;

  try {
    if (!tweetId) return res.status(400).json({ error: "NO ID FOUND" });

    const [insertRepost] = await pool.query("INSERT INTO repost VALUE (?,?)", [
      tweetId,
      userId,
    ]);

    return res.status(200).json({ success: "Reposted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const searchY = async (req, res) => {
  const { query } = req.body;
  const userId = req.user.id;
  console.log(query);
  try {
    if (!query) return res.status(200).json({ success: "Empty Y, but Y?" });

    const [queryDb] = await pool.query(
      `SELECT 
        authentication.id, 
        authentication.name, 
        authentication.username, 
        profile.profile_image, 
        tweets.*, 
        CASE 
            WHEN EXISTS (
                SELECT 1 
                FROM likedid
                WHERE likedid.userId = ? AND likedid.tweet_id = tweets.tweet_id
            ) THEN 1
            ELSE 0
        END AS isLiked
    FROM authentication
    LEFT JOIN profile ON authentication.id = profile.user_id
    LEFT JOIN tweets ON profile.user_id = tweets.userId
    WHERE tweets.tweet LIKE ? 
    ORDER BY tweets.date_published DESC;
    `,
      [userId, `%${query}%`]
    );
    
    if(queryDb.length < 1) return res.status(200).json({ success: "Empty Y, but Y?" });
    return res.status(200).json({ success: queryDb });
  } catch (err) {
    return res.status(500).json({ error: err.mesage });
  }
};

module.exports = {
  postY,
  getY,
  getYDetails,
  getOtherY,
  updateY,
  deleteY,
  updateLike,
  getUserY,
  postComment,
  getComments,
  deleteComments,
  updateComments,
  getCountOfLikes,
  repostY,
  searchY,
};
