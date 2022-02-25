const express = require("express");
const {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setTourUserIds,
  getOneReview,
} = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(protect);
router
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), setTourUserIds, createReview);

router
  .route("/:id")
  .get(getOneReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .delete(restrictTo("user", "admin"), deleteReview);
module.exports = router;