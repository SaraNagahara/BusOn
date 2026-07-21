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
 
 module.exports = class AuthController {
 
 // register user
  static async register(req, res) {
    const {
      registerName,
      registerEmail,
      registerPassword,
      registerConfirmPassword,
    } = req.body;

    const requiredFields = {
      registerName: "Nome",
      registerEmail: "Email",
      registerPassword: "Senha",
      registerConfirmPassword: "Confirmação de senha",
    };

    const email = registerEmail?.trim().toLowerCase();

    // comeco de validações
    // validações temporarias hehehe
    for (const field in requiredFields) {
      if (!req.body[field]) {
        return res
          .status(422)
          .json({ message: `O campo ${requiredFields[field]} é obrigatório!` });
      }
    }

    //Validar campos
    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Email inválido" });
    }

    // Verificar se esse email já existe cadastrado, esperar o banco de dados pra usar
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res
        .status(422)
        .json(`Esse email já existe, por favor utilize outro email.`);
    }

    if (registerPassword !== registerConfirmPassword) {
      return res.status(422).json({ message: "As senhas não conferem" });
    }

    // criar uma validação caso usuário use espaço no começo e Fim, vou mudar pra apenas limpar esse espaço e pegar conteudo.
    if (registerPassword !== registerPassword.trim()) {
      return res
        .status(422)
        .json(`Não utilize espaço no começo ou fim da senha.`);
    }

    // create password hash
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(registerPassword, salt);

    // fim de validações

    //create User, assim que definir os models da pra usar

    try {
      const newUser = await User.create({
        name: registerName,
        email: email,
        password: passwordHash,
      });

      const token = await createUserToken(newUser);

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso !!",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao cadastrar" });
    }
  }

   // Login
  static async login(req, res) {
    try {
      const loginPassword = req.body.loginPassword;
      const loginEmail = req.body.loginEmail.trim().toLowerCase();

      const user = await User.findOne({
        where: { email: loginEmail },
      });

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }

      //
      const checkPassword = await bcrypt.compare(loginPassword, user.password);

      if (!checkPassword) {
        return res.status(401).json({ message: "Senha inválida" });
      }

      const token = await createUserToken(user);
      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
  console.log(error);

  return res.status(500).json({
    message: "Erro no servidor",
    error: error.message
  });
}
  }

   // Forgot Password
  static async forgotPassword(req, res) {
    const email = req.body.email.trim().toLowerCase();

    // camada de segurança extra
    if (!email) {
      return res.status(400).json({
        message: "Email é obrigatório.",
      });
    }

    try {
      // Verificar se o usuário existe
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.json({
          message: "E-mail Incorreto.",
        });
      }

      // gerar e Criptografar Pin
      const pin = generatePin();
      const pinHash = hashPin(pin);

      // Limpa do banco qualquer pedido anterior de recuperação pendente para este usuário
      await PasswordReset.destroy({
        where: {
          user_id: user.id,
        },
      });

      // Dispara o e-mail contendo o PIN limpo e renderiza o template HTML (via Brevo)
      await PasswordReset.create({
        user_id: user.id,
        pin_hash: pinHash,
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
      });

      // Dispara o e-mail contendo o PIN limpo e renderiza o template html em (Service: emailServices)
      await EmailService.sendRecoveryPin({
        email: user.email,
        name: user.name,
        pin,
      });

      return res.json({
        message: "Código enviado com sucesso!",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

   // Validar o pin recebido!
  static async verifyPin(req, res) {
    const pin = req.body.pin;
    const email = req.body.email.trim().toLowerCase();

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          message: "Código inválido ou expirado",
        });
      }

      const pinHash = hashPin(pin);

      const reset = await PasswordReset.findOne({
        where: {
          user_id: user.id,
          used: false,
        },
        order: [["createdAt", "DESC"]],
      });

      if (!reset) {
        return res.status(400).json({
          message: "Código inválido ou expirado",
        });
      }

      // expirado
      if (reset.expires_at < new Date()) {
        return res.status(400).json({
          message: "Código inválido ou expirado",
        });
      }

      // tentativas
      if (reset.attempts >= 5) {
        return res.status(400).json({
          message: "Código inválido ou expirado",
        });
      }

      if (reset.pin_hash !== pinHash) {
        reset.attempts += 1;
        await reset.save();

        return res.status(400).json({
          message: "Código inválido ou expirado",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");

      reset.reset_token = resetToken;
      reset.used = true;

      await reset.save();

      return res.json({
        message: "PIN válido",
        resetToken,
        UserName: user.name, // Apenas para fim de teste, preciso remover.
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    console.log("Enviando email para:", email);
    console.log("PIN:", pin);
  }


  // Reset password
  static async resetPassword(req, res) {
    // criar um fluxo aqui pro usuário n usar a msm senha antiga.

    const { newPassword, token } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(422).json({
        message: "Senha precisa ter no mínimo 6 caracteres",
      });
    }

    const resetRequest = await PasswordReset.findOne({
      where: {
        reset_token: token,
      },
    });

    if (!resetRequest) {
      return res.status(400).json({
        message: "Token inválido!",
      });
    }

    if (resetRequest.expires_at < new Date()) {
      return res.status(400).json({
        message: "Token expirado!",
      });
    }

    const user = await User.findOne({
      where: {
        id: resetRequest.user_id,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Erro interno, tente novamente!",
      });
    }

    const salt = await bcrypt.genSalt(12);

    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;

    await user.save();

    // invalidar token pra n usar mais de uma vez.
    ResetTokenUser.used = true;

    await ResetTokenUser.save();

    return res.status(200).json({
      message: "Senha alterada com sucesso",
    });
  }

    // logout
  static logout(req, res) {
    try {
      return res.status(200).json({
        success: true,
        message: "Logout realizado com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao realizar logout.",
      });
    }
  }

  // Get authenticated user
static async me(req,res){

  try {

    const user = await getUserByToken(req);

    return res.json({
      id:user.id,
      name:user.name,
      email:user.email
    });

  } catch(error){

    return res.status(401).json({
      message:error.message
    });

  }

}

}