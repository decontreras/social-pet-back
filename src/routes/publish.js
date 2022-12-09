const { Router } = require("express");
const {
  newPublish,
  getListPublish,
  getListlistByUser,
  addLike,
  addRequest,
  addComment,
  getRequestByUser
} = require("../controllers/publish.controller");
const router = Router();

router.post("/newPublish", newPublish);
router.get("/list", getListPublish);
router.get("/listByUser/:id", getListlistByUser);
router.get("/getRequestByUser/:id", getRequestByUser);
router.put("/addLike/:id", addLike);
router.put("/addRequest/:id", addRequest);
router.put("/addComment/:id", addComment);

module.exports = router;