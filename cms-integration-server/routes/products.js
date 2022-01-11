const router = require("express").Router();
const ProductController = require("../controllers/products");
const { authorizeUser, authorizeUserPatch } = require("../middlewares/authorization");
const { imageKit } = require("../middlewares/imageKit");
const multerUpload = require("../middlewares/multer");


router.post("/", multerUpload, imageKit, ProductController.postProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", authorizeUser, multerUpload, imageKit, ProductController.updateProductById);
router.delete("/:id", authorizeUser, ProductController.deleteProductById);
router.patch("/:id", authorizeUserPatch, ProductController.patchProductStatusById);

module.exports = router;
