const nodemailer = require('nodemailer');

const sendMail = async options => {
   let transporter = nodemailer.createTransport({
      name : process.env.EMAIL_HOST ,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
     
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    // send mail with defined transport object
   let mailOptions = await transporter.sendMail({
   from: process.env.EMAIL_USER, 
   to: options.email , 
   subject: "Ecommerce Password Recovery" ,
   text: options.message,
   });

   return await transporter.sendMail(mailOptions);
}

module.exports = sendMail;