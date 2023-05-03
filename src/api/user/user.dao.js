const User = require("./user.model");

const buildSaveuserJson = (props) => {
  const json = {};
  json.first_name = props.first_name;
  json.last_name = props.last_name || null;
  json.mobile = props.mobile || null;
  json.email = props.email || null;
  json.password = props.password;
  json.userRole = props.userRole || 'employee';
  return json;
};

module.exports.checkUserExist = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.signupUser = (userDetail) => {
  try {
    const user = new User(buildSaveuserJson(userDetail));
    const result = user.save();
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports.getUser = async () => {
  try {
    const user = User.find()
      .select("first_name last_name mobile email password")
      .lean();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.getUserById = async (id) => {
  try {
    const user = User.findOne({ _id: id })
      .select("first_name last_name mobile email password")
      .lean();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.editUser = async (userId, params) => {
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, params, {
      new: true,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteUser = async (userId) => {
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    return user;
  } catch (error) {
    throw error;
  }
};
