import express from 'express';
import Subscriber from '../Models/Subscriber.js';
import crypto from 'crypto';
import sendMail from '../Configs/sendMail.js';

const router = express.Router();

// Subscribe endpoint
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: 'Email is required.' });

  let subscriber = await Subscriber.findOne({ email });
  if (subscriber && subscriber.isConfirmed) {
    return res.json({ success: false, message: 'Already subscribed.' });
  }

  const confirmToken = crypto.randomBytes(32).toString('hex');
  if (!subscriber) {
    subscriber = new Subscriber({ email, confirmToken });
  } else {
    subscriber.confirmToken = confirmToken;
  }
  await subscriber.save();

  // Send confirmation email
  const confirmUrl = `${process.env.FRONTEND_URL.replace(/\/$/, '')}/newsletter/confirm/${confirmToken}`;
    await sendMail(email, 'Confirm your subscription', `Click to confirm: ${confirmUrl}`);

  res.json({ success: true, message: 'Confirmation email sent. Please check your inbox.If not found in inbox check spam folder.' });
});

// Confirm endpoint
router.get('/confirm/:token', async (req, res) => {
  const { token } = req.params;
  const subscriber = await Subscriber.findOne({ confirmToken: token });
  if (!subscriber) return res.send('Invalid or expired confirmation link.');

  subscriber.isConfirmed = true;
  subscriber.confirmToken = undefined;
  await subscriber.save();

  res.send('Subscription confirmed! You will now receive updates.');
});

export default router;