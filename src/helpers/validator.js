const { body, validationResult } = require("express-validator");

const signupValidator = () => [
  body("name")
    .isString()
    .not()
    .isEmpty()
    .trim()
    .withMessage("name cannot be empty"),
  body("email")
    .isEmail()
    .trim()
    .withMessage("email must be valid and cannot be empty"),
  body("password")
    .isLength({ min: 5 })
    .trim()
    .withMessage("password must be at least 5 chars long"),
];

const loginValidator = () => [
  body("email")
    .isEmail()
    .trim()
    .withMessage("email must be valid and cannot be empty"),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .withMessage("password field cannot be empty"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    status: 422,
    errors: extractedErrors,
  });
};

module.exports = {
  signupValidator,
  loginValidator,
  validate,
};
