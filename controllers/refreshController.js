// routes/auth.js
const privatekey= process.env.PRIVATE_KEY;
const refreshkey=process.env.REFRESH_KEY;
const jwt = require('jsonwebtoken');

exports.refreshToken=async (req, res) => {
  const { token } = req.body;

  if (!token) {
      return res.status(401).send('Refresh token required');
  }

  // Verify the refresh token
  jwt.verify(token, refreshkey, (err, user) => {
      if (err) {
          return res.status(403).send('Invalid refresh token');
      }

      // Generate a new access token
      const accessToken = jwt.sign({ username: user.username }, privatekey, {
          expiresIn: '5m', // New token validity (e.g., 15 minutes)
      });

      res.json({ token: accessToken });
  });
};
