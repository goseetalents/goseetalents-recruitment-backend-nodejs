import bodyParser from 'body-parser';
import config from './server/config/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './server/routes'

mongoose.Promise = require('bluebird');

let app = express();

app.server = http.createServer(app);

mongoose.connect(config.db, {
  useMongoClient: true
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${config.db}`);
});

if (config.env === 'development') {
  mongoose.set('debug', true);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

app.use(morgan('dev'));

app.use((err, req, res, next) => {
  res.status(err.status)
  .json({
    status: err.status,
    message: err.message
  });
  next();
});

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`API Server started and listening on port ${config.port} (${config.env})`);
});



export default app;
