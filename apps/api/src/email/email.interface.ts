export interface SendEmailProps {
  from: string;
  to: string;
  subject: string;
  body: string;
  replyToEmail?: string;
}
