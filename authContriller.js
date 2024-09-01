const User = require("./models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id) => {
  const payload = {
    id
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "ошибка при регистрации", errors });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "такий юзер вже існує" });
      }

      const hashPassword = bcryptjs.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
      });
      await user.save();
      return res.json({ message: "пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `пользователь с таким ${username} не найден` });
      }
      const validPasword = bcryptjs.compareSync(password, user.password);
      if (!validPasword) {
        res.status(400).json({ message: "неверній пароль" });
      }
      // токен
      const token = generateAccessToken(user._id, user.role);
      // возвращаем токен на клиент
      return res.json({ token });

    } catch (e) {
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new authController();
