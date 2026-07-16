const User = require("../models/User");
const validator = require("validator");
const { createUserToken } = require("../services/authService");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generatePin, hashPin } = require("../validators/validators");
const PasswordReset = require("../models/PasswordReset");
const EmailService = require("../services/emailService");
const getUserByToken = require("../middlewares/get-user-by-token");
const getToken = require("../middlewares/getToken");

module.exports = class UserController {

  static async homepage(req, res) {
    return res.json({
      message: "Essa é a home",
    });
  }

  // change user password
  static async changeUserPassword(req, res) {
    const { password, newPassword, newPasswordConfirmation } = req.body;

    // Get user by token in the header
    const user = await getUserByToken(req, res);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    try {
      // check match password
      if (newPassword !== newPasswordConfirmation) {
        return res.status(400).json({
          message: "A nova senha e a confirmação da senha não coincidem.",
        });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(401).json({
          message: "Senha atual incorreta.",
        });
      }
      // Encrypts the new password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      // Update in the database
      user.password = passwordHash;

      await user.save();

      return res.status(200).json({
        message: "Senha alterada com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno!",
      });
    }
  }

  // Change User Email
  static async changeUserEmail(req, res) {
    const { newEmail } = req.body;

    // Get user by token in the header
    const user = await getUserByToken(req, res);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    try {
      if (!validator.isEmail(newEmail)) {
        return res.status(400).json({ message: "E-mail invalido!" });
      }

      user.email = newEmail;

      await user.save();

      return res.status(200).json({
        message: "Email aterado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno!",
      });
    }
  }

  // delete Account user
  static async DeleteUserByID(req, res) {
    const { password, passwordConfirmation } = req.body;

    if (!password) {
      return res.status(422).json({
        message: "O campo senha é obrigatório.",
      });
    }

    if (!passwordConfirmation) {
      return res.status(422).json({
        message: "O campo confirmação de senha é obrigatório.",
      });
    }

    const user = await getUserByToken(req, res);

    // check match password
    if (password !== passwordConfirmation) {
      return res.status(402).json({
        message: "As senhas não coincidem",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Conta deleta com sucesso!",
    });
  }
};
