const { createClient } = require("@supabase/supabase-js");
const { User } = require("../db/models/user.model");
require("dotenv").config();

/**Initialize Supabase Client */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const requireAuth = async (req, res, next) => {
  try {
    /**Get token from header */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer " prefix

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    /**Verify token with Supabase */
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !supabaseUser) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    /**Find the user in MongoDB database using the Supabase ID */
    const mongoUser = await User.findOne({ supabaseId: supabaseUser.id });

    if (!mongoUser) {
      return res
        .status(404)
        .json({ error: "User not found in local database" });
    }

    /**Attach the MongoDB User (or just the ID) to the request object */
    req.user = mongoUser;

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = requireAuth;
