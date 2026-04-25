import nodemailer from 'nodemailer';
import config from '../../config/env';

const sendContactEmail = async (payload: { firstName: string; lastName: string; email: string; message: string }) => {
  // Check for credentials - If they are placeholders, we use "Test Mode" (Console Log)
  const isTestMode = !config.email_pass || config.email_pass === '12345';

  if (isTestMode) {
    console.log('--- [CONTACT FORM TEST MODE] ---');
    console.log(`From: ${payload.firstName} ${payload.lastName} <${payload.email}>`);
    console.log(`To: ${config.email_user}`);
    console.log(`Subject: New Contact Form Submission`);
    console.log(`Message: ${payload.message}`);
    console.log('-------------------------------');
    
    return { 
      success: true, 
      isTestMode: true,
      message: 'Test Mode: Message logged to console. Update .env with a valid Gmail App Password for real delivery.' 
    };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  });

  const mailOptions = {
    from: `"${payload.firstName} ${payload.lastName}" <${config.email_user}>`,
    replyTo: payload.email,
    to: config.email_user,
    subject: 'New Contact Form Submission - Beevora',
    text: `You have received a new message from ${payload.firstName} ${payload.lastName} (${payload.email}):\n\n${payload.message}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h3 style="color: #f59e0b;">New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
          ${payload.message.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return { success: true, result };
  } catch (error: any) {
    console.error('Nodemailer Error:', error);
    return { success: false, message: error.message };
  }
};

export const ContactService = {
  sendContactEmail,
};
