const Router = require("express");
const router = new Router();
const controller = require("./authContriller");
// валидация
const { check } = require("express-validator");

router.post(
  "/registration",
  [check("username", "имя пользователя не может быть пустым").notEmpty(),
    check("password", "пароль должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 10}),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);

module.exports = router;
                                                                          