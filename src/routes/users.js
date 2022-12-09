const { Router } = require("express");
const {
    userById,
    userBySearch,
    update
} = require("../controllers/user.controller");
const router = Router();

router.get("/userById/:id", userById);
router.get("/userBySearch/:text", userBySearch);
router.put("/update/:id", update);

module.exports = router;
