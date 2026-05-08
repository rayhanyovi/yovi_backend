const express = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { loginRules } = require("../validators/auth.validator");

const router = express.Router();

router.post("/login", loginRules, validate, authController.login);
router.get("/me", authMiddleware, authController.me);

module.exports = router;
