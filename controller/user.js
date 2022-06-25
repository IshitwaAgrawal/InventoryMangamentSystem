require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = async (req, res) => {
  try {
    let { name, username, email } = req.body;
    let password = (await bcrypt.hash(req.body.password, 10)).toString();
    if (await User.findOne({ username: username })) {
      return res.status(502).send("Username already exists!");
    }
    if (await User.findOne({ email: email }))
      return res.status(502).send("Email already registered!");
    let user = new User({
      name,
      username,
      email,
      password,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY
    );
    user.token = token;
    await user.save().then((d) => {
      res.send(d);
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials!");
  } catch (error) {
    console.log(error);
  }
};

const view = async (req, res) => {
  await User.find({}).then((data) => {
    res.send(data);
  });
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.view = view;
