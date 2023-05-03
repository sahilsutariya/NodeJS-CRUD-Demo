const APIError = require("../utils/APIError");
const { decodeToken } = require("../api/user/generate-token");
const adminDao = require("../api/user/user.dao");

module.exports.verifyAccessToken = async (req, res, next) => {
  try {
    const props = req.headers;
    if (props.authorization) {
      /* Decode token for verify user */
      const decode = await decodeToken(props.authorization);

      if (!decode) {
        throw new APIError({ message: "Invalid Token", status: 401 });
      }

      let admin = null;
      admin = await adminDao.checkUserExist(decode.payload.email);
      if (admin) {
        req.headers["admin"] = admin;
        next();
      } else {
        throw new APIError({ message: "Invalid Token", status: 401 });
      }
    } else {
      throw new APIError({
        message: "Authorization not provided!",
        status: 401,
      });
    }
  } catch (error) {
    next({ message: "Authorization not provided!", status: 401 });
  }
};
