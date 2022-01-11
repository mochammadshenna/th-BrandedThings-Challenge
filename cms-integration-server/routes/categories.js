const router = require("express").Router();
const CategoryController = require("../controllers/categories");
const authenticateUser = require("../middlewares/authentication");
const { authorizeUserCat } = require("../middlewares/authorization");

router.get("/", CategoryController.getCategories);
router.post("/", authenticateUser, CategoryController.postCategory);
router.delete("/:id", authenticateUser, authorizeUserCat, CategoryController.deleteCategoryById);

module.exports = router;
