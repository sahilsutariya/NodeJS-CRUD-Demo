const userService = require("./user.service");

/**
 * @param {req} req - Requests
 * @param {res} res - Response
 * @param {next} next - next
 * Login User controller
 */
 module.exports.loginUserHandler = async (req, res, next) => {
  try {
    const props = req.body;
    const result = await userService.loginUser(props);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {req} req - Requests
 * @param {res} res - Response
 * @param {next} next - next
 * Get User
 */
module.exports.getUser = async (req, res, next) => {
  try {
    const result = await userService.getUsers();
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {req} req - Requests
 * @param {res} res - Response
 * @param {next} next - next
 */
 module.exports.getUserFromId = async (req, res, next) => {
  try {
    const UserId = req.params.id;
    const result = await userService.getUserFromId(UserId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {req} req - Requests
 * @param {res} res - Response
 * @param {next} next - next
 */
module.exports.signupUser = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await userService.signupUser(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {req} req - Requests
 * @param {res} res - Response
 * @param {next} next - next
 */
module.exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.editUser(userId, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {req} req - Requests
 * @param {res} res - Response
 * @param {next} next - next
 * Delete User
 */
module.exports.removeUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.removeUser(userId, req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
