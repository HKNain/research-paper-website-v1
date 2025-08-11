import { transporter } from "./nodemailer.js";

export const mailSender = async (req, res) => {
  try {
    const mailOption = {
      from: `"Dr. Tayyab Khan" <${process.env.EMAIL_USER}>`,
      to: req.body.to,
      subject: "Dr. Tayyab Khan is inviting you to review an application",
      text: "You are invited to review an application.",
      html: `<b>Hello,</b><br>
             You are invited to review an application.<br>
             <a href="https://your-website.com/review?appId=${req.body.appId}">Click here to review</a>`,
    };

    const info = await transporter.sendMail(mailOption);

    console.log("Message sent:", info.messageId);
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    console.log("Error in sending mail through node mailer");
    res.status(502).json({ message: "Email wasn't sent" });
  }
};
