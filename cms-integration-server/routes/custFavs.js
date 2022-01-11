const router = require("express").Router();
const CustFavController = require("../controllers/custFav");
const { authorizeCustomerFavs } = require("../middlewares/authorization");

router.get("/", authorizeCustomerFavs, CustFavController.getCustomerFavs);
router.post("/:productId", authorizeCustomerFavs, CustFavController.postCustomerFavs);
router.delete("/:favoriteId", authorizeCustomerFavs, CustFavController.deleteCustomerFavsById);

module.exports = router;
