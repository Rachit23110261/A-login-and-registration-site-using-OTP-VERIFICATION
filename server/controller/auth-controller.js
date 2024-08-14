const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const Contact = require("../models/contact");
const Chattwithmodel = require("../models/Chatwith");
const sendOTP = require("./otp-controller");
const sendVerificationEmail = require("./email-controller");

const home = async (req, res) => {
  try {
    res.status(200).send("hello");
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const saltround = 10;
    const hash_password = await bycrypt.hash(password, saltround);

    const usercreated = await User.create({ username, email, phone, password });
    res.status(200).send({
      msg: "usercreated",
      token: await usercreated.generatetoken(),
      userId: usercreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (email != userExists.email) {
      return res.status(400).send({ msg: "invalid credentials" });
    } else {
      // const user= await bycrypt.compare(password, userExists.password)
      // const user= await userExists.comparepassword(password)
      if (password != userExists.password) {
        return res.status(401).send({ msg: "invalid email or password" });
      } else {
        res.status(200).send({
          msg: "userlogined",
          token: await userExists.generatetoken(),
          userId: userExists._id.toString(),
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
};
const contact = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    res.status(200).send({ msg: "messagesent" });
  } catch (errror) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};
const otpverify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otp == otphere) {
      res.status(200).send({ msg: "otp-verified" });
    } else {
      res.status(401).send({ msg: "incorrect-otp" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
};
let otphere;
let phonenumber;
const otpsend = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    console.log(userExists);
    console.log(email);

    phonenumber = `+91${userExists.phone}`;
    console.log(phonenumber);
    otphere = await sendOTP(phonenumber);
    if (otphere) {
      res.status(200).send({ msg: "otp-sent-successfully" });
    } else {
      res.status(401).send({ msg: "incorrect phone number" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
};
let emailotphere;
const emailotpsend = async (req, res) => {
  try {
    const { email, otp } = req.body;
    emailotphere = await sendVerificationEmail(email);
    if (otphere) {
      res.status(200).send({ msg: "otp-verified" });
    } else {
      res.status(401).send({ msg: "incorrect-otp" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
};
const emailverify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otp == emailotphere) {
      res.status(200).send({ msg: "otp-verified" });
    } else {
      res.status(401).send({ msg: "incorrect-otp" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
};
const Chat = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.find({ email });
    let emaillist = [];

    for (let i = 0; i < userExists.length; i++) {
      const userExist = userExists[i];
      emaillist.push(userExist.email);
      console.log(userExist);
    }

    console.log(emaillist);
    if (emaillist[0]) {
      res.status(200).send({ users: userExists });
    } else {
      res.status(401).send({ msg: "no user found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
};
const Chatwith = async (req, res) => {

  try {
   
    const { email } = req.body;
    console.log(req.body);
    const userforname  = await User.findOne({ email })
    console.log(userforname)
    const userExists = await Chattwithmodel.findOne({ email });
    const username=userforname.username
    

    const usercreated = await Chattwithmodel.create({ username, email });
    const chatwithpeoples = await Chattwithmodel.find();
    res.status(200).send({
      msg: "chat added",
      totalchats: chatwithpeoples,
      username:username
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" , err});

  }
};

module.exports = {
  home,
  register,
  login,
  contact,
  otpverify,
  emailverify,
  otpsend,
  emailotpsend,
  Chat,
  Chatwith,
};
