    import nodemailer from 'nodemailer';

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

    export const sendPaymentEmail = async (userEmail, amount, orderId) => {
    const paymentLink = `${process.env.FRONTEND_URL}/payment?order=${orderId}&amount=${amount}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Payment Request',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Payment Request</h2>
            <p>Amount to be paid: ₹${amount}</p>
            <p>Order ID: ${orderId}</p>
            <div style="text-align: center; margin: 30px 0;">
            <a href="${paymentLink}" 
                style="background-color: #4CAF50; color: white; padding: 14px 25px; 
                        text-decoration: none; border-radius: 4px; display: inline-block;">
                Pay Now
            </a>
            </div>
            <p>Click the button above to complete your payment.</p>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Payment email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending payment email:', error);
        return false;
    }
    };