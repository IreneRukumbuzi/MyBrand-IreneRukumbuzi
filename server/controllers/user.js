import jwt from 'jsonwebtoken';
import User from '../models/User';

exports.landingMessage = (req, res) => {
  res.send({ message: 'Welcome to my Portfolio' });
};

exports.pass = (req, res) => {
  req.login(req.body, (error) => {
    User.findOne({ email: req.body.email });
    const token = jwt.sign({ admin: User }, 'secret');
    if (error) res.send('Wrong Password');
    else {
      res.status(200).send({
        status: 200,
        token,
      });
    }
  });
};
