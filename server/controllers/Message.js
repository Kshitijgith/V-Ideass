const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();
// Configure API key
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
apiKey.apiKey = process.env.bravo_key; // Store this in environment variables for security

// Create email data
const sendEmail = async (toEmail, subject, message) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const emailData = {
    sender: { email: process.env.email, name: 'V-Ideas' },
    to: [{ email: toEmail }],
    subject: subject,
    htmlContent: `<p>${message}</p>`, // You can use HTML here
  };

  try {
    const response = await apiInstance.sendTransacEmail(emailData);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error.response?.text || error.message);
  }
};
module.exports=sendEmail;


