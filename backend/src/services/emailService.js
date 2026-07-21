const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

class EmailService {

  static async sendRecoveryPin({ email, name, pin }) {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const templatePath = path.join(
      __dirname,
      "../templates/recovery-pin.html"
    );

    let html = fs.readFileSync(
      templatePath,
      "utf8"
    );

    html = html
      .replace("{{NAME}}", name)
      .replace("{{CODE}}", pin);

      // eu chapei o email ali temporário prq a gente n tem um dominio valido ainda.

    // await transporter.sendMail({
    //   from: `"BusOn" <${process.env.SMTP_USER}>`,
    //   to: email,
    //   subject: "Recuperação de Senha",
    //   html
    // });
    await transporter.sendMail({
      from: 'richardcruzsemo@gmail.com',
      to: email,
      subject: "Recuperação de Senha",
      html
    });
  }
}

module.exports = EmailService;