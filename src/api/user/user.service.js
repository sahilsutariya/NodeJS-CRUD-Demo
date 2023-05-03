const userDao = require("./user.dao");
const { Format } = require("../../config/formate");
const APIError = require("../../utils/APIError");
const bcrypt = require("bcrypt");
const { getToken } = require("./generate-token");

module.exports.loginUser = async (props) => {
  try {
    /* Check User is  registered or not */
    const user = await userDao.checkUserExist(props.email);
    if (user && user !== null) {
      const dbPassword = user.password;
      const password = props.password;
      const passwordDecrypt = await bcrypt.compareSync(password, dbPassword);
      if (passwordDecrypt) {
        const token = await getToken({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });

        return Format.success({ user, token }, "success");
      } else {
        throw new APIError({ message: "Incorrect Password.", status: 500 });
      }
    } else {
      throw new APIError({ message: "User not registered.", status: 500 });
    }
  } catch (error) {
    throw error;
  }
};

/**
 * User Signup
 *
 * @param {props} params - SIGNUP USER
 */
module.exports.signupUser = async (params) => {
  try {
    const user = await userDao.checkUserExist(params.email);
    if (user) {
      throw new APIError({
        message: "User already registered with Email",
        status: 500,
      });
    }
    const passwordHash = await bcrypt.hashSync(params.password, 10);
    params.password = passwordHash;
    const result = await userDao.signupUser(params);
    return Format.success(result, "Success");
  } catch (error) {
    throw error;
  }
};

/**
 * Get Users
 *
 * @param {props} props - User session
 */
module.exports.getUsers = async () => {
  try {
    let users = await userDao.getUser();
    return Format.success(users, "Success");
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {userId} userId - userId of User
 */
module.exports.getUserFromId = async (userId) => {
  try {
    const user = await userDao.getUserById(userId);
    const result = user;
    return Format.success(result, "Success");
  } catch (error) {
    throw error;
  }
};

/**
 * Edit User
 *
 * @param {userId} userId - req.param
 * @param {params} params - req.body
 */
module.exports.editUser = async (userId, params) => {
  try {
    const result = await userDao.editUser(userId, params);
    return Format.success(result, "success");
  } catch (error) {
    throw error;
  }
};

/**
 * @param {userId} userId - userId
 * @param {params} params - params
 * delete User
 */
module.exports.removeUser = async (userId, params) => {
  try {
    const result = await userDao.deleteUser(userId);
    return Format.success(result, "success");
  } catch (error) {
    logger.error(`[ UserService removeUser()] ${error}`);
    throw error;
  }
};