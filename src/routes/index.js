const router = require("express").Router();

router.use(require("./userRoute"));
router.use(require("./memorialRoute"));

module.exports = router;
