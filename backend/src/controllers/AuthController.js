
const User = require("../models/User");
const validator = require("validator");
const { createUserToken } = require("../services/authService");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  generatePin,
  hashPin
} = require("../validators/validators");

const PasswordReset = require("../models/PasswordReset");
const EmailService = require("../services/emailService");
const getUserByToken = require("../middlewares/get-user-by-token");


// =========================================================
// CONFIGURAÇÕES DO COOKIE
// =========================================================

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 4 * 60 * 60 * 1000,
};


// Opções usadas para limpar o cookie
const clearCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};


module.exports = class AuthController {


  // =======================================================
  // REGISTER
  // =======================================================

  static async register(req, res) {

    try {

      const {
        registerName,
        registerEmail,
        registerPassword,
        registerConfirmPassword,
      } = req.body;


      // ---------------------------------------------------
      // CAMPOS OBRIGATÓRIOS
      // ---------------------------------------------------

      const requiredFields = {
        registerName: "Nome",
        registerEmail: "Email",
        registerPassword: "Senha",
        registerConfirmPassword: "Confirmação de senha",
      };


      for (const field in requiredFields) {

        if (!req.body[field]) {

          return res.status(422).json({
            message:
              `O campo ${requiredFields[field]} é obrigatório!`,
          });

        }

      }


      // ---------------------------------------------------
      // NORMALIZAÇÃO
      // ---------------------------------------------------

      const name = registerName.trim();

      const email = registerEmail
        .trim()
        .toLowerCase();


      // ---------------------------------------------------
      // VALIDA NOME
      // ---------------------------------------------------

      if (name.length < 2) {

        return res.status(422).json({
          message:
            "O nome deve possuir pelo menos 2 caracteres.",
        });

      }


      if (name.length > 100) {

        return res.status(422).json({
          message:
            "O nome é muito longo.",
        });

      }


      // ---------------------------------------------------
      // VALIDA EMAIL
      // ---------------------------------------------------

      if (!validator.isEmail(email)) {

        return res.status(422).json({
          message: "E-mail inválido.",
        });

      }


      // ---------------------------------------------------
      // VALIDA SENHA
      // ---------------------------------------------------

      if (registerPassword.length < 6) {

        return res.status(422).json({
          message:
            "A senha deve conter no mínimo 6 caracteres.",
        });

      }


      if (registerPassword.length > 128) {

        return res.status(422).json({
          message:
            "A senha é muito longa.",
        });

      }


      // ---------------------------------------------------
      // CONFIRMAÇÃO
      // ---------------------------------------------------

      if (
        registerPassword !==
        registerConfirmPassword
      ) {

        return res.status(422).json({
          message:
            "As senhas não conferem.",
        });

      }


      // ---------------------------------------------------
      // ESPAÇOS NO COMEÇO/FIM
      // ---------------------------------------------------

      if (
        registerPassword !==
        registerPassword.trim()
      ) {

        return res.status(422).json({
          message:
            "Não utilize espaço no começo ou fim da senha.",
        });

      }


      // ---------------------------------------------------
      // VERIFICA EMAIL EXISTENTE
      // ---------------------------------------------------

      const existingUser = await User.findOne({
        where: {
          email,
        },
      });


      if (existingUser) {

        return res.status(409).json({
          message:
            "Não foi possível realizar o cadastro com esses dados.",
        });

      }


      // ---------------------------------------------------
      // HASH SENHA
      // ---------------------------------------------------

      const passwordHash = await bcrypt.hash(
        registerPassword,
        12
      );


      // ---------------------------------------------------
      // CRIA USUÁRIO
      // ---------------------------------------------------

      const newUser = await User.create({
        name,
        email,
        password: passwordHash,
      });


      // ---------------------------------------------------
      // LOGIN AUTOMÁTICO
      // ---------------------------------------------------

      const token = createUserToken(newUser);


      res.cookie(
        "token",
        token,
        cookieOptions
      );


      return res.status(201).json({

        message:
          "Usuário cadastrado com sucesso!",

        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },

      });

    } catch (error) {

      console.error(
        "Erro no cadastro:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor ao cadastrar.",
      });

    }

  }


  // =======================================================
  // LOGIN
  // =======================================================

  static async login(req, res) {

    try {

      const {
        loginEmail,
        loginPassword,
      } = req.body;


      // ---------------------------------------------------
      // CAMPOS
      // ---------------------------------------------------

      if (
        !loginEmail ||
        !loginPassword
      ) {

        return res.status(400).json({
          message:
            "E-mail e senha são obrigatórios.",
        });

      }


      // ---------------------------------------------------
      // NORMALIZA EMAIL
      // ---------------------------------------------------

      const email = loginEmail
        .trim()
        .toLowerCase();


      // ---------------------------------------------------
      // VALIDA EMAIL
      // ---------------------------------------------------

      if (!validator.isEmail(email)) {

        return res.status(401).json({
          message:
            "E-mail ou senha inválidos.",
        });

      }


      // ---------------------------------------------------
      // BUSCA USUÁRIO
      // ---------------------------------------------------

      const user = await User.findOne({
        where: {
          email,
        },
      });


      // Não revela se o usuário existe
      if (!user) {

        return res.status(401).json({
          message:
            "E-mail ou senha inválidos.",
        });

      }


      // ---------------------------------------------------
      // VERIFICA SENHA
      // ---------------------------------------------------

      const checkPassword =
        await bcrypt.compare(
          loginPassword,
          user.password
        );


      if (!checkPassword) {

        return res.status(401).json({
          message:
            "E-mail ou senha inválidos.",
        });

      }


      // ---------------------------------------------------
      // CRIA JWT
      // ---------------------------------------------------

      const token =
        createUserToken(user);


      // ---------------------------------------------------
      // COOKIE HTTPONLY
      // ---------------------------------------------------

      res.cookie(
        "token",
        token,
        cookieOptions
      );


      return res.status(200).json({

        message:
          "Login realizado com sucesso.",

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },

      });

    } catch (error) {

      console.error(
        "Erro no login:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor.",
      });

    }

  }


  // =======================================================
  // FORGOT PASSWORD
  // =======================================================

  static async forgotPassword(req, res) {

    try {

      const {
        email: rawEmail
      } = req.body;


      if (!rawEmail) {

        return res.status(400).json({
          message:
            "E-mail é obrigatório.",
        });

      }


      const email = rawEmail
        .trim()
        .toLowerCase();


      // ---------------------------------------------------
      // EMAIL INVÁLIDO
      // ---------------------------------------------------

      if (!validator.isEmail(email)) {

        return res.status(200).json({

          message:
            "Se o e-mail estiver cadastrado, enviaremos um código de recuperação.",

        });

      }


      // ---------------------------------------------------
      // BUSCA USUÁRIO
      // ---------------------------------------------------

      const user = await User.findOne({
        where: {
          email,
        },
      });


      // Não revela existência
      if (!user) {

        return res.status(200).json({

          message:
            "Se o e-mail estiver cadastrado, enviaremos um código de recuperação.",

        });

      }


      // ---------------------------------------------------
      // GERA PIN
      // ---------------------------------------------------

      const pin =
        generatePin();


      // Hash PIN
      const pinHash =
        hashPin(pin);


      // ---------------------------------------------------
      // REMOVE RECUPERAÇÕES ANTERIORES
      // ---------------------------------------------------

      await PasswordReset.destroy({
        where: {
          user_id: user.id,
        },
      });


      // ---------------------------------------------------
      // CRIA NOVA RECUPERAÇÃO
      // ---------------------------------------------------

      await PasswordReset.create({

        user_id: user.id,

        pin_hash: pinHash,

        expires_at:
          new Date(
            Date.now() +
            10 * 60 * 1000
          ),

        attempts: 0,

        used: false,

      });


      // ---------------------------------------------------
      // ENVIA EMAIL
      // ---------------------------------------------------

      await EmailService.sendRecoveryPin({

        email: user.email,

        name: user.name,

        pin,

      });


      return res.status(200).json({

        message:
          "Se o e-mail estiver cadastrado, enviaremos um código de recuperação.",

      });

    } catch (error) {

      console.error(
        "Erro no forgot password:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor.",
      });

    }

  }


  // =======================================================
  // VERIFY PIN
  // =======================================================

  static async verifyPin(req, res) {

    try {

      const {
        pin,
        email: rawEmail,
      } = req.body;


      if (
        !pin ||
        !rawEmail
      ) {

        return res.status(400).json({
          message:
            "Código inválido ou expirado.",
        });

      }


      const email = rawEmail
        .trim()
        .toLowerCase();


      if (!validator.isEmail(email)) {

        return res.status(400).json({
          message:
            "Código inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // BUSCA USUÁRIO
      // ---------------------------------------------------

      const user = await User.findOne({
        where: {
          email,
        },
      });


      if (!user) {

        return res.status(400).json({
          message:
            "Código inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // HASH PIN
      // ---------------------------------------------------

      const pinHash =
        hashPin(pin);


      // ---------------------------------------------------
      // BUSCA RECUPERAÇÃO
      // ---------------------------------------------------

      const reset =
        await PasswordReset.findOne({

          where: {

            user_id:
              user.id,

            used: false,

          },

          order: [
            ["createdAt", "DESC"]
          ],

        });


      if (!reset) {

        return res.status(400).json({
          message:
            "Código inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // EXPIRAÇÃO
      // ---------------------------------------------------

      if (
        reset.expires_at <
        new Date()
      ) {

        return res.status(400).json({
          message:
            "Código inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // TENTATIVAS
      // ---------------------------------------------------

      if (
        reset.attempts >= 5
      ) {

        return res.status(400).json({
          message:
            "Código inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // COMPARA PIN
      // ---------------------------------------------------

      if (
        reset.pin_hash !==
        pinHash
      ) {

        reset.attempts += 1;

        await reset.save();

        return res.status(400).json({
          message:
            "Código inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // GERA RESET TOKEN
      // ---------------------------------------------------

      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");


      // Hash do token
      const resetTokenHash =
        crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");


      reset.reset_token =
        resetTokenHash;


      await reset.save();


      // NÃO marca used aqui.
      // O token será invalidado quando
      // a senha realmente for alterada.


      return res.status(200).json({

        message:
          "PIN válido.",

        resetToken,

      });

    } catch (error) {

      console.error(
        "Erro ao verificar PIN:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor.",
      });

    }

  }


  // =======================================================
  // RESET PASSWORD
  // =======================================================

  static async resetPassword(req, res) {

    try {

      const {
        newPassword,
        newPasswordConfirmation,
        token,
      } = req.body;


      // ---------------------------------------------------
      // CAMPOS
      // ---------------------------------------------------

      if (
        !newPassword ||
        !newPasswordConfirmation ||
        !token
      ) {

        return res.status(422).json({
          message:
            "Todos os campos são obrigatórios.",
        });

      }


      // ---------------------------------------------------
      // TAMANHO
      // ---------------------------------------------------

      if (
        newPassword.length < 6
      ) {

        return res.status(422).json({
          message:
            "A senha precisa ter no mínimo 6 caracteres.",
        });

      }


      if (
        newPassword.length > 128
      ) {

        return res.status(422).json({
          message:
            "A senha é muito longa.",
        });

      }


      // ---------------------------------------------------
      // ESPAÇOS
      // ---------------------------------------------------

      if (
        newPassword !==
        newPassword.trim()
      ) {

        return res.status(422).json({
          message:
            "Não utilize espaço no começo ou fim da senha.",
        });

      }


      // ---------------------------------------------------
      // CONFIRMAÇÃO
      // ---------------------------------------------------

      if (
        newPassword !==
        newPasswordConfirmation
      ) {

        return res.status(400).json({
          message:
            "As senhas não coincidem.",
        });

      }


      // ---------------------------------------------------
      // HASH TOKEN
      // ---------------------------------------------------

      const tokenHash =
        crypto
          .createHash("sha256")
          .update(token)
          .digest("hex");


      // ---------------------------------------------------
      // BUSCA TOKEN
      // ---------------------------------------------------

      const resetRequest =
        await PasswordReset.findOne({

          where: {

            reset_token:
              tokenHash,

            used: false,

          },

        });


      if (!resetRequest) {

        return res.status(400).json({
          message:
            "Token inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // EXPIRAÇÃO
      // ---------------------------------------------------

      if (
        resetRequest.expires_at <
        new Date()
      ) {

        return res.status(400).json({
          message:
            "Token inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // BUSCA USUÁRIO
      // ---------------------------------------------------

      const user =
        await User.findOne({

          where: {
            id:
              resetRequest.user_id,
          },

        });


      if (!user) {

        return res.status(400).json({
          message:
            "Token inválido ou expirado.",
        });

      }


      // ---------------------------------------------------
      // IMPEDE REUTILIZAÇÃO DA SENHA
      // ---------------------------------------------------

      const samePassword =
        await bcrypt.compare(
          newPassword,
          user.password
        );


      if (samePassword) {

        return res.status(400).json({
          message:
            "A nova senha deve ser diferente da senha anterior.",
        });

      }


      // ---------------------------------------------------
      // HASH NOVA SENHA
      // ---------------------------------------------------

      const passwordHash =
        await bcrypt.hash(
          newPassword,
          12
        );


      user.password =
        passwordHash;


      await user.save();


      // ---------------------------------------------------
      // INVALIDA TOKEN
      // ---------------------------------------------------

      resetRequest.used =
        true;

      resetRequest.reset_token =
        null;


      await resetRequest.save();


      // ---------------------------------------------------
      // LIMPA COOKIE
      // ---------------------------------------------------

      res.clearCookie(
        "token",
        clearCookieOptions
      );


      return res.status(200).json({

        message:
          "Senha alterada com sucesso. Faça login novamente.",

      });

    } catch (error) {

      console.error(
        "Erro no reset de senha:",
        error
      );

      return res.status(500).json({
        message:
          "Erro interno do servidor.",
      });

    }

  }


  // =======================================================
  // LOGOUT
  // =======================================================

  static logout(req, res) {

    try {

      res.clearCookie(
        "token",
        clearCookieOptions
      );


      return res.status(200).json({

        success: true,

        message:
          "Logout realizado com sucesso.",

      });

    } catch (error) {

      console.error(
        "Erro no logout:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Erro ao realizar logout.",

      });

    }

  }


  // =======================================================
  // USUÁRIO AUTENTICADO
  // =======================================================

  static async me(req, res) {

    try {

      const user =
        await getUserByToken(req);


      return res.status(200).json({

        id: user.id,

        name: user.name,

        email: user.email,

      });

    } catch (error) {

      return res.status(401).json({
        message:
          "Não autorizado.",
      });

    }

  }

};

