const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
mongoose.connect(
  'mongodb+srv://admin:1234567890@cluster0.ic2u2vh.mongodb.net/'
);
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});
// const user = new User({
//   name: "harkirat Singh",
//   email: "abc@gmail.com",
//   password: "123456",
// });

// user.save();

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  let userExists = false;
  for (let i = 0; i < ALL_USERS.length; i++){
    if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
      userExists = true;
    }
  }
  return userExists;
}
app.post('/signup', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    let userExists = await User.findOne({ email: username });
    if (userExists) {
        res.status(400).send("The user already exists");
    }

    const user = new User({
        name: name,
        email: username,
        password:password
    })
    user.save();
    res.json({
        msg:"User Added"
    })
})

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
    res.json({
      users: ALL_USERS.filter((value) => {
        if (value.username == username) {
          return false;
        }
        else return true;
      })
    });
    
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)