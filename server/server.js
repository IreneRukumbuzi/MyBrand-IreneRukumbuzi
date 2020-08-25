import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import passport from './config/passport';
import router from './routes/index';
import swaggerDocument from '../swagger.json';
import './seeds/admin';

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose
  .connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
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
