import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from './config/passport';
import router from './routes/index';

const PORT = process.env.PORT || 7000;
const db = require('./config/keys').default.MongoURI;

const app = express();
require('./seeds/admin');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database connected succesfully...');
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'secret',
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', router);
}).catch((err) => {
  console.log(`${err}`);
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}...`);
});
export default app;
