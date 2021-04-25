const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email,
        this.password = user.password,
        this.firstName = user.name.trim().split(' ')[0],
        this.url = url,
        this.from = `Tourism <${process.env.EMAIL}>`
    }
    newTransport() {
        return nodemailer.createTransport({
            service: `gmail`,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }
    async send(templete, subject) {

        //1) Render HTMl mail templete
        let html;
        if(subject==='Welcome to the Natours Family')
            html = `<h1> Welcome ${this.firstName} in Natours family </h1>`
        else
            html = 
            `<label>Your new password : </label> 
            <p>${this.password}</p>`

        //2) Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }

        //3)send mail using transpoter
        await this.newTransport().sendMail(mailOptions)
    }
    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family')
    }
    async sendResetPassword() {
        await this.send('resetPassword', 'Your password is reseted for tourism-site')
    }
}