const router = require("express").Router();
const UserController = require("../controllers/users");

router.get("/", UserController.getUsers);

module.exports = router;
