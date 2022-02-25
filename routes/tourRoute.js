const express = require("express");
const {
  createTour,
  deleteTour,
  getAllTours,
  getOneTour,
  updateTour,
  aliasTopTours,
  getMonthlyPlan,
  getTourStats,
  getTourWithin,
  getDistances,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRoute = require("../routes/reviewRoute");

const router = express.Router();
// router.param("id", checkID);
router.use(express.json());

router.use("/:tourId/reviews", reviewRoute);

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);
router.route("/tour-stats").get(getTourStats);
router
  .route("/monthly-plan/:year")
  .get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan);
//TODO HANDLER
router.route("/distances/:latlng/unit/:unit").get(getDistances);
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getTourWithin);

router
  .route("/")
  .get(getAllTours)
  .post(protect, restrictTo("admin", "lead-guide"), createTour);
router
  .route("/:id")
  .get(getOneTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

/*router
  .route("/:tourId/reviews")
  .post(protect, restrictTo("user"), createReview);*/
module.exports = router;
