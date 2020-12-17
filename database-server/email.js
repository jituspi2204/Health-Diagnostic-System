var nodemailer = require('nodemailer');
var pug = require('pug');
module.exports = class Mail {
    constructor(user, url) {
      this.url = url;
      this.name = user.name;
      this.to = user.email;
      this.from = "minorprojectmsit21@gmail.com";
    }
  
    newTransporter() {
      return new nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: "apikey",
          pass:process.env.SENDGRID + "",
        },
      });
    }
  
    async send(template, subject, message) {
      const html = pug.renderFile(`${__dirname}/views/_${template}.pug`, {
        name: this.name,
        from: "<Health Diagnostice System-Get your email confirmed>",
        subject: subject,
        message: message,
        url : this.url
      });
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: subject,
        html: html,
      };
      await this.newTransporter().sendMail(mailOptions);
    }
  
    async verifyEmail() {
      await this.send(
        "welcome",
        "Email Verify Link",
        "In order to verify your mail and activate your account please click on below link"
      );
    }
    async forgotPasswordEmail() {
      await this.send(
        "verifyUser",
        "Forgot Password",
        "Temporary login password !!"
      );
    }
    async submitted() {
      await this.send(
        "booking",
        "Details",
        "Thanks for submitting patient details"
      );
    }
  };
  
