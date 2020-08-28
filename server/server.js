import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport';
import router from './routes/index';
import swaggerDocument from '../swagger.json';
import './seeds/admin';

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

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
