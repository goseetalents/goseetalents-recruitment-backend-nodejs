import app from '../../index';
// import config from '../config/config';
import { clearDatabase } from '../helpers/clearDB';
import { expect } from 'chai';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';
import sinon from 'sinon';
import Applicant from '../models/applicant';
import User from '../models/user';

mongoose.models = {};
mongoose.modelSchemas = {};

describe('## API Tests', () => {

  let sandbox, applicant, user;

  beforeEach((done) => {
    clearDatabase(() => {
      sandbox = sinon.sandbox.create();

      Applicant
        .create({
          name: 'testlist'
        })
        .then((l) => {
          list = l;

          Card.create({
            title: 'Card #1',
            list: list._id
          }).then((c) => {
            card = c;
          });

        });

      User
        .create({
          username: 'testuser',
          password: 'testuser'
        })
        .then((u) => {
          user = u;
          done();
        });

    });
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  describe('### GET /api/users', () => {
    it('should GET all available users', (done) => {
        request(app)
          .get('/api/users')
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body[0]._id).to.exist;
            expect(response.body[0].username).to.exist;
            expect(response.body[0].password).to.exist;
            expect(response.body[0]._id).to.equal(user._id.toString());
            expect(response.body[0].username).to.equal(user.username.toString());
            expect(response.body[0].password).to.equal(user.password.toString());
            done();
          });
    });
  });

  describe('### GET /api/list', () => {
    it('should GET all available lists', (done) => {
        request(app)
          .get('/api/list')
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body[0]._id).to.exist;
            expect(response.body[0].name).to.exist;
            expect(response.body[0].cards).to.exist;
            expect(response.body[0]._id).to.equal(list._id.toString());
            expect(response.body[0].name).to.equal(list.name.toString());
            expect(response.body[0].cards[0]._id).to.equal(card._id.toString());
            expect(response.body[0].cards[0].title).to.equal(card.title.toString());
            expect(response.body[0].cards[0].list).to.equal(list._id.toString());
            done();
          });
    });
  });

  describe('### GET /api/list/:listId', () => {
    it('should GET specific list by listId param', (done) => {
        request(app)
          .get(`/api/list/${list._id.toString()}`)
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body._id).to.exist;
            expect(response.body.name).to.exist;
            expect(response.body._id.toString()).to.equal(list._id.toString());
            expect(response.body.name.toString()).to.equal(list.name.toString());
            done();
          });
    });
  });

  describe('### POST /api/list', () => {

    const list2 = {
      name: 'list2'
    };

    it('should create a new list', (done) => {
        request(app)
          .post('/api/list')
          .send(list2)
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body._id).to.exist;
            expect(response.body.name).to.exist;
            expect(response.body.name.toString()).to.equal(list2.name.toString());
            done();
          });
    });

  });

  describe('### PUT /api/list/:listId', () => {

    it('should update lists name specified by listId param', (done) => {

        const putList = {
          name: "i was changed"
        }

        request(app)
          .put(`/api/list/${list._id}`)
          .send(putList)
          .then(response => {
            expect(response.body._id).to.exist;
            expect(response.body.name).to.exist;
            expect(response.body.cards).to.exist;
            expect(response.body._id.toString()).to.equal(list._id.toString());
            expect(response.body.name.toString()).to.equal(putList.name.toString());
            done();
          });
    });

  });

  describe('### DELETE /api/list', () => {

    it('should DELETE list specified by listId param', (done) => {

      const list3 = new List({
        name: "The Chronicles of Narnia"
      });

      list3.save((error, list3) =>
        request(app)
        .delete(`/api/list/${list3._id.toString()}`)
        .end((error, response) => {
          expect(response.status).to.equal(204);
          done();
        })
      );

    });

  });

  describe('### GET /api/card', () => {
    it('should GET all available cards', (done) => {
      request(app)
        .get('/api/card')
        .expect(httpStatus.OK)
        .then(response => {
          expect(response.body[0]._id).to.exist;
          expect(response.body[0].list).to.exist;
          expect(response.body[0].title).to.exist;
          expect(response.body[0]._id).to.equal(card._id.toString());
          expect(response.body[0].list).to.equal(card.list.toString());
          expect(response.body[0].title).to.equal(card.title.toString());
          done();
        });
    });
  });

  describe('### GET /api/card/:cardId', () => {
    it('should GET specific card by cardId', (done) => {
        request(app)
          .get(`/api/card/${card._id.toString()}`)
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body._id).to.exist;
            expect(response.body.list).to.exist;
            expect(response.body.title).to.exist;
            expect(response.body._id).to.equal(card._id.toString());
            expect(response.body.list).to.equal(card.list.toString());
            expect(response.body.title).to.equal(card.title.toString());
            done();
          });
    });
  });

  describe('### POST /api/card', () => {

    it('should create a new card', (done) => {
        request(app)
          .post('/api/card')
          .send({
            title: 'Card #2',
            list: list._id
          })
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.body._id).to.exist;
            expect(response.body.title).to.exist;
            expect(response.body.list).to.exist;
            expect(response.body.title.toString()).to.equal('Card #2');
            done();
          });
    });

  });

  describe('### PUT /api/card/:cardId', () => {

    it('should update card', (done) => {
      const putCard = {
        title: "i was changed"
      }
      request(app)
        .put(`/api/card/${card._id.toString()}`)
        .send(putCard)
        .then(response => {
          expect(response.body._id).to.exist;
          expect(response.body.title).to.exist;
          expect(response.body.list).to.exist;
          expect(response.body._id.toString()).to.equal(card._id.toString());
          expect(response.body.title.toString()).to.equal(putCard.title);
          expect(response.body.list.toString()).to.equal(card.list.toString());
          done();
        });
    });

  });

  describe('### DELETE /api/card', () => {

    it('should DELETE a card by cardID', (done) => {
        request(app)
        .delete(`/api/card/${card._id.toString()}`)
        .end((error, response) => {
          expect(response.status).to.equal(204);
          done();
        })
    });

  });



});
