const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const salt = 10;

export const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      password: hashedPassword,
      email,
    });
    await user.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.json({ error: "Failed to create user" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      res.json({ error: "Invalid Email" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      res.json({ error: "Invalid Password" });
    }
    
    const payload = { username: user.username, email: user.email, id: user._id };
    const secret = 'your_jwt_secret';
    const expiresIn = '1h';

    const token = jwt.sign(payload, secret, { expiresIn });

    res.json({ user, token });
  } catch (err) {
    console.log(err, "error");
  }
};
