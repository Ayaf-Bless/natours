const Review = require("../models/reviewModal");
//const catchAsync = require("../utils/catchAsync");
const {
  deleteOne,
  UpdateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlerFactory");

exports.getAllReviews = getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getOneReview = getOne(Review);
exports.updateReview = UpdateOne(Review);
exports.deleteReview = deleteOne(Review);
exports.createReview = createOne(Review);
