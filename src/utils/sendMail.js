import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Load environment variables

const sendMail = async (to, subject, text, html) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use 'gmail' or another email provider
      secure:true,
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or App Password
      },
    });

    // Email options
    const mailOptions = {
      from: `"User Managmant portal " <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
};

export default sendMail;
