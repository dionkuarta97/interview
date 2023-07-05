var nodemailer = require("nodemailer");

function sendEmail(email, token) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: "diondpkp97@gmail.com",
    to: `${email}`,
    subject: "Token Untuk Ganti Password",
    html: `<div align="center"><p>Silahkan Copy Token Dibawah</p>
    <h3>${token}</h3>
    </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
