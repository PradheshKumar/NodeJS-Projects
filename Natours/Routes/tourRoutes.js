const express = require('express');
const app = express();
const tourController = require('./../Controllers/tourController');

const router = express.Router();
// router.param('id', tourController.checkId);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/').get(tourController.getAllTours).post(tourController.addTour);

router.route('/get-stats').get(tourController.getStats);
router.route('/monthly-plan/:year').get(tourController.monthlyPlan);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
