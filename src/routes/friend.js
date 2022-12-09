const { Router } = require("express");
const {
  request,
  getByUsers,
  getRequest,
  acceptRequest,
  declineRequest,
  getFriends,
  getById
} = require("../controllers/friend.controller");
const router = Router();

router.post("/request", request);
router.get("/listByUsers/:user_1/:user_2", getByUsers);
router.get("/listRequest/:id", getRequest);
router.put("/acceptRequest", acceptRequest);
router.put("/declineRequest", declineRequest);
router.get("/listFriends/:id", getFriends);
router.get("/getById/:id", getById);

module.exports = router;