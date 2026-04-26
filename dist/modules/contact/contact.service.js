"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../../config/env"));
const contact_model_1 = require("./contact.model");
const sendContactEmail = async (payload) => {
    // Check for credentials - If they are placeholders, we use "Test Mode" (Console Log)
    const pass = (env_1.default.email_pass || '').trim();
    const isTestMode = !pass || pass === '12345' || pass === 'kayes1122' || pass === 'your-app-password';
    if (isTestMode) {
        // Save to Database even in Test Mode so user can verify DB insertion
        const contactData = {
            ...payload,
            date: new Date().toLocaleString(),
        };
        await contact_model_1.Contact.create(contactData);
        console.log('--- [CONTACT FORM TEST MODE] ---');
        console.log(`From: ${payload.firstName} ${payload.lastName} <${payload.email}>`);
        console.log(`To: ${env_1.default.email_user}`);
        console.log(`Subject: New Contact Form Submission`);
        console.log(`Message: ${payload.message}`);
        console.log('-------------------------------');
        return {
            success: true,
            isTestMode: true,
            message: 'Test Mode Success! Message saved to database. To send real emails, you MUST use a 16-character Google App Password.'
        };
    }
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: env_1.default.email_user,
            pass: env_1.default.email_pass,
        },
    });
    const mailOptions = {
        from: `"${payload.firstName} ${payload.lastName}" <${env_1.default.email_user}>`,
        replyTo: payload.email,
        to: env_1.default.email_user,
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
        // Save to Database
        const contactData = {
            ...payload,
            date: new Date().toLocaleString(),
        };
        await contact_model_1.Contact.create(contactData);
        // Send Email
        const result = await transporter.sendMail(mailOptions);
        return { success: true, result };
    }
    catch (error) {
        console.error('Nodemailer Error:', error);
        let errorMessage = error.message;
        // Catch both 535 and 534 Gmail error codes
        if (error.message.includes('535') || error.message.includes('534') || error.message.includes('Invalid login') || error.message.includes('Application-specific password required')) {
            errorMessage = 'Google Secure Login Required: You MUST use a 16-character App Password. Your regular password was rejected.';
        }
        else if (error.message.includes('ECONNREFUSED')) {
            errorMessage = 'Could not connect to Gmail SMTP server. Check your internet connection or firewall.';
        }
        return { success: false, message: errorMessage };
    }
};
exports.ContactService = {
    sendContactEmail,
};
