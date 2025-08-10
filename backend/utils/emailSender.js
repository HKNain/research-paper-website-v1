import nodemailer from "nodemailer";

export const mailSender = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "maddison53@ethereal.email", //user email
        pass: "jn7jnAPss4f63QBp6D", //key
      },
    });

    // jo email jaega uska object
    const mailOption = {
      from: '"Dr. Tayyab Khan" <tayyab email>',
      to: req.body.to, // receiver ka email from request
      subject: "Dr. Tayyab Khan is inviting you to review an application",
      text: "This is a test email",
      html: "<b>Hello world?</b>",
    }

    const info = await transporter.sendMail(mailOption);

    console.log("Message sent:", info.messageId);
    console.log(info);
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    console.log("Error in sending mail through node mailer")
    console.log(error.message);
    res.status(502).json({message: "Email wasn'ta sent"})
  }
};
