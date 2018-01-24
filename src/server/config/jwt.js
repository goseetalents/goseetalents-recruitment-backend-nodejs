import config from './config';
import jwt from 'express-jwt';

const authenticate = jwt({
  secret: config.jwtSecret
});

export default authenticate;
