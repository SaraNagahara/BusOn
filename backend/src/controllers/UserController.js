
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const getUserByToken =
  require("../middlewares/get-user-by-token");


// =========================================================
// COOKIE
// =========================================================

const clearCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};


module.exports = class UserController {


  // =======================================================
  // ALTERAR SENHA
  // =======================================================

  static async changeUserPassword(req, res) {

    try {

      const {
        password,
        newPassword,
        newPasswordConfirmation,
      } = req.body;


      if (
        !password ||
        !newPassword ||
        !newPasswordConfirmation
      ) {

        return res.status(422).json({
          message:
            "Todos os campos de senha são obrigatórios.",
        });

      }


      if (
        newPassword.length < 6
      ) {

        return res.status(400).json({
          message:
            "A nova senha deve possuir pelo menos 6 caracteres.",
        });

      }


      if (
        newPassword.length > 128
      ) {

        return res.status(400).json({
          message:
            "A nova senha é muito longa.",
        });

      }


      if (
        newPassword !==
        newPasswordConfirmation
      ) {

        return res.status(400).json({
          message:
            "A nova senha e a confirmação da senha não coincidem.",
        });

      }


      if (
        password === newPassword
      ) {

        return res.status(400).json({
          message:
            "A nova senha deve ser diferente da senha atual.",
        });

      }


      const user =
        await getUserByToken(req);


      if (!user) {

        return res.status(404).json({
          message:
            "Usuário não encontrado.",
        });

      }


      const checkPassword =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!checkPassword) {

        return res.status(401).json({
          message:
            "Senha atual incorreta.",
        });

      }


      const passwordHash =
        await bcrypt.hash(
          newPassword,
          12
        );


      user.password =
        passwordHash;


      await user.save();


      // Invalida sessão atual
      res.clearCookie(
        "token",
        clearCookieOptions
      );


      return res.status(200).json({

        message:
          "Senha alterada com sucesso! Faça login novamente.",

      });

    } catch (error) {

      console.error(
        "Erro ao alterar senha:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor.",
      });

    }

  }


  // =======================================================
  // ALTERAR EMAIL
  // =======================================================

  static async changeUserEmail(req, res) {

    try {

      const {
        newEmail,
        password,
      } = req.body;


      if (
        !newEmail ||
        !password
      ) {

        return res.status(422).json({
          message:
            "Novo e-mail e senha são obrigatórios.",
        });

      }


      const normalizedEmail =
        newEmail
          .trim()
          .toLowerCase();


      if (
        !validator.isEmail(
          normalizedEmail
        )
      ) {

        return res.status(400).json({
          message:
            "E-mail inválido.",
        });

      }


      const user =
        await getUserByToken(req);


      if (!user) {

        return res.status(404).json({
          message:
            "Usuário não encontrado.",
        });

      }


      const checkPassword =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!checkPassword) {

        return res.status(401).json({
          message:
            "Senha atual incorreta.",
        });

      }


      if (
        normalizedEmail ===
        user.email.toLowerCase()
      ) {

        return res.status(400).json({
          message:
            "O novo e-mail deve ser diferente do atual.",
        });

      }


      const existingUser =
        await User.findOne({
          where: {
            email:
              normalizedEmail,
          },
        });


      if (
        existingUser &&
        existingUser.id !== user.id
      ) {

        return res.status(409).json({
          message:
            "Este e-mail já está sendo utilizado.",
        });

      }


      user.email =
        normalizedEmail;


      await user.save();


      // Invalida sessão
      res.clearCookie(
        "token",
        clearCookieOptions
      );


      return res.status(200).json({

        message:
          "E-mail alterado com sucesso! Faça login novamente.",

      });

    } catch (error) {

      console.error(
        "Erro ao alterar e-mail:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor.",
      });

    }

  }


  // =======================================================
  // EXCLUIR CONTA
  // =======================================================

  static async DeleteUserByID(req, res) {

    try {

      const {
        password,
        passwordConfirmation,
      } = req.body;


      if (
        !password ||
        !passwordConfirmation
      ) {

        return res.status(422).json({
          message:
            "Senha e confirmação de senha são obrigatórias.",
        });

      }


      if (
        password !==
        passwordConfirmation
      ) {

        return res.status(400).json({
          message:
            "As senhas não coincidem.",
        });

      }


      const user =
        await getUserByToken(req);


      if (!user) {

        return res.status(404).json({
          message:
            "Usuário não encontrado.",
        });

      }


      const checkPassword =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!checkPassword) {

        return res.status(401).json({
          message:
            "Senha incorreta.",
        });

      }


      await user.destroy();


      res.clearCookie(
        "token",
        clearCookieOptions
      );


      return res.status(200).json({

        message:
          "Conta deletada com sucesso.",

      });

    } catch (error) {

      console.error(
        "Erro ao excluir conta:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor.",
      });

    }

  }

};
