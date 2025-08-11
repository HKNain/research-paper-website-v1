import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2297618692e384",
    pass: "3417c9197af070"
  }
});

export const mailSender = async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"Tayyab" <researchhelptry@gmail.com>',
      to: req.body.to,
      subject: "Review",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.log(error.message);
    console.log("error in mail sender")
    res.status(500).json({error: "Error in sending mail"})
  }
  

  
};