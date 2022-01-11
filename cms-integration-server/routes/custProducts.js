const router = require("express").Router();
const CustProductController = require("../controllers/custProducts");


router.get("/", CustProductController.getCustomerProducts);
router.get("/:id", CustProductController.getCustomerProductById);

module.exports = router;
