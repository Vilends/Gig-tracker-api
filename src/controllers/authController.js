const User = require('../models/User');
const bcrypt = require('bcryptjs');

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const otp = Math.floor(100000 + 900000 * Math.random()).toString();

  user.resetOTP = otp;
  user.resetOTPExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  console.log('Reset OTP:', otp);

  res.status(200).json({ message: 'OTP sent' });
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.resetOTP || !user.resetOTPExpires) {
    return res.status(400).json({ message: 'No OTP request found' });
  }

  if (user.resetOTP !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  if (user.resetOTPExpires < Date.now()) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOTP = undefined;
  user.resetOTPExpires = undefined;

  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
};


