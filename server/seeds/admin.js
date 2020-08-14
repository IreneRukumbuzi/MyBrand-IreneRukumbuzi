const User = require ('../models/User');

const admin = {
    email: 'admin@gmail.com',
    password: '123456az',
}

const newUser = new User(admin);
newUser.save();