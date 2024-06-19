import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

const mailOptions: Options = {
    from: process.env.NODEMAILER_USER,
    to: '',
    subject: '',
    html: ''
};

export const send_email = async (userEmail: string, subject: string, text: string) => {
    try {
        mailOptions.to = userEmail;
        mailOptions.subject = subject;
        mailOptions.html = text;

        if (mailOptions.to && mailOptions.subject && mailOptions.html) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } else {
            console.log('Mail data was not provided');
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}