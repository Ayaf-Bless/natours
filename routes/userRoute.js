const express = require("express");
const {
  createUsers,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
  getMe,
  updateMe,
  deleteMe,
} = require("./../controllers/userController");
const {
  signup,
  login,
  restrictTo,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} = require("./../controllers/authController");

const router = express.Router();

//TODO ROUTER

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect);
router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", protect, deleteMe);
router.get("/me", getMe, getOneUser);
router.patch("/updateMyPassword", updatePassword);

router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUsers);
router.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = router;
