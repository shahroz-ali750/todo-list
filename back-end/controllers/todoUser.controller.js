const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

let createToken = function (id) {
  return jwt.sign({ id }, "kdfjlfdljdflgjflgjdfilgjdflkgjdflgkjdf", {
    expiresIn: "1h",
  });
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == "" || password == "") {
      res.status(400).json({ err: "all field must be filled" });
    }
    let user = await User.findOne({ where: { email } });
    console.log("user email =>", user);
    if (!user) {
      return res
        .status(400)
        .json({ err: "user email is not found in our system" });
    }
    let isCompared = await bcrypt.compare(password, user.password);
    if (!isCompared) {
      return res.status(400).json({ err: "enter correct password" });
    }
    // else{
    //   res.status(200).json({'user signed in  =>':user})
    // }
    let token = createToken(user.id);
    return res.status(201).json({
      msg: "success",
      data: {
        id:user.id,
        // email: user.email,
        // userName: user.userName,
        token
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message, msg: "msg" });
  }
  // res.status(200).json("user signtodo is called");
};

const register = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(200).json("email is not validated");
    } else if (!validator.isAlpha(userName)) {
      return res.status(200).json("username must contain on alphabet");
    } else if (!validator.isStrongPassword(password)) {
      return res
        .status(200)
        .json(
          "password contain alphabet small + capital and special character and number "
        );
    }
    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    //  console.log("encrypted =>", encryptedPassword)

    const user = await User.create({
      email,
      password: encryptedPassword,
      userName,
      role: "reader",
    });
    // console.log('user created successfully', user)
    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        userName: user.userName,
      },
      msg: "user created successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }

  //    res.status(200).json("user register todo is called");
};

module.exports = { signIn, register };
