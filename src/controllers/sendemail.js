const nodemailer = require('nodemailer');

async function postSendemail (req, res, next) {
    try {
        const { email, subject, message } = req.body;
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            const htmlEmail = `
            <h3>Email enviado desde Museum.com</h3>
            <ul>
                <li>Email: ${email}</li>
                <li>Subject: ${subject}</li>
            </ul>
            <h3>Mensaje:</h3>
            <p>${message}</p>
            `;
            let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "mauuuricio@hotmail.com", // generated ethereal user
                    pass: "LicenCompo2013", // generated ethereal password
                },
            });
            // setup email data with unicode symbols
            let mailOptions = {
                from: "Museum.com", // sender address
                to: req.body.email, // list of receivers
                subject: req.body.subject, // Subject line
                text: req.body.message, // plain text body
                html: htmlEmail, // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                console.log("url: %s", nodemailer.getTestMessageUrl(info));
                res.status(200).json({
                    message: "Email enviado correctamente",
                });
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al enviar el email",
            error,
        });
    }
}



            








module.exports = {
    postSendemail,
};
