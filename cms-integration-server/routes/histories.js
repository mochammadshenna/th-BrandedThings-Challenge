const router = require("express").Router();
const HistoryController = require("../controllers/histories");

router.get("/", HistoryController.getHistory);

module.exports = router;
