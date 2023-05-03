/* global Format */
const { messages } = require("../../utils/messages");

const jwt = require("jsonwebtoken");

const {
  config: {
    auth: {
      token: { tokenExpire, refreshTokenExpire, secret },
    },
  },
} = require("../../config/config");

/**
 * Generate Token Middleware
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 */
module.exports.generateToken = async (req, res, next) => {
  try {
    // User Payload for token generation
    const payload = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenExpire });
    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: refreshTokenExpire,
    });
    req.token = {
      value: token,
    };
    req.refreshToken = {
      value: refreshToken,
    };
    const response = {
      token: req.token,
      refreshToken: req.refreshToken,
      user: payload,
    };
    res.json(Format.success(response, messages("loginsuccess")));
  } catch (error) {
    // logger.error('Error at genrated Token');
    next(error);
  }
};

module.exports.getToken = async (
  payload,
  isRefresh = false,
  expiryTime = tokenExpire
) => {
  return await jwt.sign({ payload }, secret, {
    expiresIn: isRefresh ? refreshTokenExpire : expiryTime,
  });
};

module.exports.decodeToken = async (token) => {
  return await jwt.verify(token, secret);
};
