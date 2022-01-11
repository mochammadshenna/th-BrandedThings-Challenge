const router = require("express").Router();
const CustAuthController = require("../controllers/custAuth");
const custProductRoutes = require("./custProducts");
const custFavRoutes = require("./custFavs");
const authenticateUser = require("../middlewares/authentication");


router.post("/register", CustAuthController.postCustomerRegister);
router.post("/login", CustAuthController.postCustomerLogin);
router.post("/googleSignIn", CustAuthController.postCustomerGoogleSignIn);
router.get("/checkToken", CustAuthController.getCustomerToken);
router.use("/products", custProductRoutes);
router.use(authenticateUser);
router.use("/favorites", custFavRoutes);

module.exports = router;
