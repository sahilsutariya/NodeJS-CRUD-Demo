const config = {
  auth: {
    opts: {
      passReqToCallback: true,
      salt: 10,
    },
    token: {
      tokenExpire: '48h',
      refreshTokenExpire: '30d',
      secret: 'keyboard cat',
    },
  },
};

module.exports.config = config;
  