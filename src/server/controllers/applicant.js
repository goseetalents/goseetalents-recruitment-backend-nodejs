import Applicant from '../models/applicant';

function load(req, res, next, id) {``
  Applicant.findById(id)
    .exec()
    .then((applicant) => {
      req.dbApplicant = applicant;
      return next();
    }, (e) => next(e));
}

function get(req, res) {
  return res.json(req.dbApplicant);
}

function create(req, res, next) {
  Applicant.create({
      name: req.body.name,
      notes: req.body.notes,
      notinttech: req.body.notinttech,
      reminder: req.body.reminder,
      tipper: req.body.tipper,
      whynotint: req.body.whynotint
    })
    .then((savedApplicant) => {
      return res.json(savedApplicant);
    }, (e) => next(e));
}

function update(req, res, next) {
  const applicant = req.dbApplicant;
  Object.assign(applicant, req.body);

  applicant.save()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

function list(req, res, next) {

  let query = {};

  if (req.query.name) {
    query = {'name': {'$regex': req.query.name, '$options': 'i'}};
  }

  Applicant.find(query)
    .exec()
    .then((applicants) => res.json(applicants),
      (e) => next(e));
}

function remove(req, res, next) {
  const applicant = req.dbApplicant;
  applicant.remove()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

export default { load, get, create, update, list, remove };
