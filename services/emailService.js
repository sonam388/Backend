import nodemailer from "nodemailer";

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

export const sendDonationReceipt = async ({ donorName, email, amount, paymentId }) => {
  const transporter = createTransporter();

  if (!transporter || !email) {
    return false;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Donation Payment Confirmation",
    text: `Thank you ${donorName}, your donation of INR ${amount} was received successfully. Payment ID: ${paymentId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2>Donation Received</h2>
        <p>Thank you <strong>${donorName}</strong> for supporting the Gaushala.</p>
        <p>Your donation of <strong>INR ${amount}</strong> has been received successfully.</p>
        <p>Payment ID: <strong>${paymentId}</strong></p>
      </div>
    `,
  });

  return true;
};