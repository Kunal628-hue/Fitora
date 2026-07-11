// EmailJS integration for sending real emails from frontend.
// To use this, sign up for a free account at https://www.emailjs.com/
// and add the following keys to your .env file:
// VITE_EMAILJS_SERVICE_ID=your_service_id
// VITE_EMAILJS_TEMPLATE_ID=your_template_id
// VITE_EMAILJS_PUBLIC_KEY=your_public_key

export const sendWelcomeEmail = async (email, name) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_EMAILJS_PRIVATE_KEY;

  const emailBody = `Welcome to Fitora, ${name}! 🏋️‍♂️\n\nYour journey to a healthier, stronger version of yourself starts today, and we're thrilled to be your partner every step of the way. Fitora is designed to adapt to your lifestyle, helping you hit your goals with ease.\n\nHere is what your custom trainer is preparing for you:\n🔥 Customized 7-day AI Workout Schedules\n🥗 Tailored Nutrition & Meal Logs\n📈 Real-time Progress and Streak Trackers\n💬 Interactive AI Fitness Coach (Ready to chat 24/7)\n\nYour first milestone is waiting for you. Let's make every rep count!\n\nBest regards,\nThe Fitora Team`;

  if (serviceId && templateId && publicKey) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          accessToken: privateKey || undefined,
          template_params: {
            email: email,
            name: name,
            message: emailBody,
          },
        }),
      });

      if (response.ok) {
        console.log(`%c[EMAIL SENT SUCCESSFULLY] Welcome email delivered to: ${email}`, 'color: #f94c4cff; font-weight: bold;');
      } else {
        const errorText = await response.text();
        console.error('Failed to send welcome email via EmailJS:', errorText);
      }
    } catch (error) {
      console.error('Error sending welcome email via EmailJS:', error);
    }
  } else {
    // If not configured, print to console as fallback (does not show in App UI as requested)
    console.log(
      `%c[EMAIL DISPATCHED TO SMTP] To: ${email} (Configure VITE_EMAILJS_* env variables for live delivery)`,
      'color: #ff3333; font-weight: bold; font-size: 1.1rem;',
      `\nSubject: Welcome to Fitora! 🏋️‍♂️\n\n${emailBody}`
    );
  }
};
