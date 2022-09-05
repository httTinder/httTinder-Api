export interface IEmailRequest {
  to: string;
  subject: string;
  text: string;
  html?: string;
}
