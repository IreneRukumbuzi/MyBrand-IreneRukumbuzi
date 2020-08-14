const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const passport = require("./config/passport")
const PORT = process.env.PORT || 7000;
const db = require("./config/keys").MongoURI;

const app = express();

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
require("./seeds/admin");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    saveUninitialized: true,
    resave:true,
    secret: "secret"
}))
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

console.log("Database connected succesfully...");

}).catch((err) =>{
    console.log(`${err}`);
})

app.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}...`);
});  


