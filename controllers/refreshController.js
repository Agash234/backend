

const User = require('../model/user')
const refreshkey=process.env.REFRESH_KEY;
const privatekey=process.env.PRIVATE_KEY;


 
const refreshToken = async (req, res) => {
  const { refreshToken: incomingRefreshToken } = req.body;

  if (!incomingRefreshToken) return res.sendStatus(401); 

  try {

    const decoded = jwt.verify(incomingRefreshToken, refreshkey);
    const user = await User.findById(decoded.userId); 

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res.sendStatus(403); 
    }
    const newAccessToken = jwt.sign({ userId: user._id }, privatekey, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ userId: user._id }, refreshkey, { expiresIn: '7d' });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      token: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.sendStatus(403); 
  }
};

module.exports = { refreshToken };
