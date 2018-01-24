import express from 'express';
import applicantCtrl from '../controllers/applicant';

// import auth from '../config/jwt';

const router = express.Router();

router.route('/')
  .get(applicantCtrl.list)
  .post(applicantCtrl.create);

router.route('/:applicantId')
  .get(applicantCtrl.get)
  .put(applicantCtrl.update)
  .delete(applicantCtrl.remove);

router.param('applicantId', applicantCtrl.load);

export default router;
