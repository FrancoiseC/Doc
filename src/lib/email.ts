import emailjs from '@emailjs/browser';

export class EmailService {
  private static readonly SERVICE_ID = 'your_service_id';
  private static readonly USER_ID = 'your_user_id';

  static async sendDocumentRequest(
    template: string,
    { to_email, to_name, document_type, due_date }: any
  ) {
    try {
      await emailjs.send(
        this.SERVICE_ID,
        template,
        {
          to_email,
          to_name,
          document_type,
          due_date
        },
        this.USER_ID
      );
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  static async sendFormAssignment(
    template: string,
    { to_email, to_name, form_title, due_date }: any
  ) {
    try {
      await emailjs.send(
        this.SERVICE_ID,
        template,
        {
          to_email,
          to_name,
          form_title,
          due_date
        },
        this.USER_ID
      );
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }
}