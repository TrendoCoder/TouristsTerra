let nodemailer = require("nodemailer");
let Mailgun = require("mailgen");
let ENV = require("../../../config");

let nodeConfig={
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: ENV.EMAIL,
      pass: ENV.PASSWORD,
    },
  };

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:"https://mailgen.js"
    }
})
const registerMail = async(req,res)=>{
    const {userName, userEmail, text, subject} = req.body;
    var email = {
        body: {
            name:userName,
            intro: text || 'Welcome to the Tourists Terra Community',
            outro: 'Need help, or have some question? Feel free to mail us.'
        }
    }
    var emailBody = MailGenerator.generate(email);
    let message = {
        from: ENV.EMAIL,
        to:userEmail,
        subject: subject || "SignUp Succesfully",
        html:emailBody
    }
}