const router = require("express").Router();

const userRoute = require("./user/user.routes");

router.use("/user", userRoute);

module.exports = router;


