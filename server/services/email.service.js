const nodeMailer = require('nodemailer');
const mailGen = require('mailgen');
require('dotenv').config();


const transporter = nodeMailer.createTransport({ 
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});


const regersterEmail = async(useremail, user) => { 
  try {
    const emailToken = user.generateRegisterToken();

    let mailGenerator = new mailGen({ 
      theme: 'default',
      product: { 
        name: 'Waves Guitars',
        link: `${process.env.CLIENT_URL}`
      }
    });

    const email = { 
      body: {
        name: useremail,
        intro: 'Welcome to Waves Guitars! We\'re very excited to have you on board.',
        action: { 
          instructions: 'To validate your email address, please click here:',
          button: { 
            color: '#1a73e8',
            text: 'Confirm your account',
            link: `${process.env.CLIENT_URL}verification?t=${emailToken}`
          }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      },
    }

    let emailBody = mailGenerator.generate(email);
    let message = { 
      from: process.env.EMAIL,
      to: useremail,
      subject: 'Welcome to Waves Guitars',
      html: emailBody
    }

    await transporter.sendMail(message);

    return true;

  } catch (error) {
    throw error;
  }
}


module.exports = {
  regersterEmail
}
