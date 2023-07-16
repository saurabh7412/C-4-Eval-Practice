const user = require("../Models/userModel");

const check = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const checkUser = await user.findOne({ email });

    if (checkUser) {
      return res.status(400).send("user already exists !!");
    } else if (
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*()<>?]/.test(password) ||
      password.length < 8
    ) {
      res.status(400).send("Not a Valid Password !");
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = check;
