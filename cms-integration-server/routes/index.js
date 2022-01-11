const router = require("express").Router();
const userRoutes = require("./users");
const productRoutes = require("./products");
const categoriesRoutes = require("./categories");
const custRoutes = require("./customers");
const historiesRoutes = require("./histories");
const AuthController = require("../controllers/auths");
const authenticateUser = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.get("/", (req, res) => { res.send("Hello") });
router.post("/register", AuthController.postAdminRegister);
router.post("/login", AuthController.postLogin);
router.post("/googleSignIn", AuthController.postGoogleSignIn);
router.get("/checkToken", AuthController.getToken);
router.use("/customer", custRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", authenticateUser, productRoutes);
router.use("/users", authenticateUser, userRoutes);
router.use("/histories", authenticateUser, historiesRoutes);
router.use(errorHandler);

module.exports = router;
