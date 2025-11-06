const { allowedOrigins } = require("./allowedOrigins");

exports.corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Access denied by CORS"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization", "x-token","socket-header"],
  credentials: true,
  optionsSuccessStatus: 200,
};

/**
 * x-token header is stated twice..here and in app.js
 * should all be stated otherwise app fails
 */