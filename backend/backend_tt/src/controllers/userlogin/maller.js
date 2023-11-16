let nodemailer = require("nodemailer");
let Mailgen = require("mailgen");
let ENV = require("../../../config");

let nodeConfig={
    service:'gmail',
    auth: {
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
    transporter.sendMail(message)
    .then(()=>{
        res.status(200).send("OTP send to you successfully");
    })
    .catch(error => res.status(500).send(err))
}
module.exports.registerMail = registerMail;