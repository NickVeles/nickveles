const BRAND_NAME = "Nick Veles";
const SITE_URL = "https://nickveles.com";

type NotificationData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ConfirmationData = {
  name: string;
  subject: string;
  message: string;
};

// Email sent to the site owner with the submitted contact details.
export function contactNotificationHtml(data: NotificationData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      <div style="padding: 20px 0;">
        <p style="margin: 10px 0;">
          <strong style="color: #555;">Name:</strong>
          <span style="color: #333;">${data.name}</span>
        </p>
        <p style="margin: 10px 0;">
          <strong style="color: #555;">Email:</strong>
          <a href="mailto:${data.email}" style="color: #0066cc;">${data.email}</a>
        </p>
        <p style="margin: 10px 0;">
          <strong style="color: #555;">Subject:</strong>
          <span style="color: #333;">${data.subject}</span>
        </p>
        <div style="margin: 20px 0;">
          <strong style="color: #555;">Message:</strong>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p style="color: #333; line-height: 1.6; margin: 0;">
              ${data.message.replace(/\n/g, "<br>")}
            </p>
          </div>
        </div>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888;">
        <p>This email was sent from your website's contact form.</p>
      </div>
    </div>
  `;
}

export function contactNotificationText(data: NotificationData): string {
  return `New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from your website's contact form.`;
}

// Confirmation email sent back to the person who filled out the form,
// letting them know their message was received successfully.
export function contactConfirmationHtml(data: ConfirmationData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
        Thanks for reaching out, ${data.name}!
      </h2>
      <div style="padding: 20px 0;">
        <p style="color: #333; line-height: 1.6; margin: 10px 0;">
          Your message has been sent successfully. I've received it and will get
          back to you as soon as possible.
        </p>
        <p style="color: #555; margin: 20px 0 10px 0;">Here's a copy of what you sent:</p>
        <p style="margin: 10px 0;">
          <strong style="color: #555;">Subject:</strong>
          <span style="color: #333;">${data.subject}</span>
        </p>
        <div style="margin: 10px 0;">
          <strong style="color: #555;">Message:</strong>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p style="color: #333; line-height: 1.6; margin: 0;">
              ${data.message.replace(/\n/g, "<br>")}
            </p>
          </div>
        </div>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888;">
        <p>This is an automated confirmation from <a href="${SITE_URL}" style="color: #0066cc;">nickveles.com</a>. Please do not reply to this email.</p>
      </div>
    </div>
  `;
}

export function contactConfirmationText(data: ConfirmationData): string {
  return `Thanks for reaching out, ${data.name}!

Your message has been sent successfully. I've received it and will get back to you as soon as possible.

Here's a copy of what you sent:

Subject: ${data.subject}

Message:
${data.message}

---
This is an automated confirmation from ${SITE_URL}. Please do not reply to this email.`;
}

export const CONFIRMATION_SUBJECT = `Contact confirmation from Nick Veles`;
export const CONFIRMATION_FROM_NAME = BRAND_NAME;
