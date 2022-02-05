const JWT = require("jsonwebtoken");
const { User } = require("../db");

const sendEmail = require("../helpers/send-email");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { CLIENT_URL } = process.env;
const { Op } = require("sequelize");


/////////////////////////////////////
async function validateResetToken({ token }) {
  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) throw "Invalid token";

  return user;
}

async function hash(password) {
  return await bcrypt.hash(password, 10);
}

async function resetPassword({ token, password }) {
  const user = await validateResetToken({ token });

  // update password and remove reset token
  user.password = await hash(password);
  user.passwordReset = Date.now();
  user.resetToken = null;
  await user.save();
}
function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

async function forgotPassword({ email }, origin) {
  const user = await User.findOne({ where: { email } });

  // always return ok response to prevent email enumeration
  if (!user) return;

  // create reset token that expires after 24 hours
  user.resetToken = randomTokenString();
  user.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  // send email
  await sendPasswordResetEmail(user, origin);
}

async function sendPasswordResetEmail(user, origin) {
  let message;
  if (origin) {
    const resetUrl = `${origin}/user/reset-password?token=${user.resetToken}`;
    message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                 <p><a href="${resetUrl}">${resetUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to reset your password with the <code>/user/reset-password</code> api route:</p>
                 <p><code>${user.resetToken}</code></p>`;
  }

  await sendEmail({
    to: user.email,
    subject: "Museum - Reset Password",
    html: `<h4>Reset Password Email</h4>
             ${message}`,
  });
}

module.exports = {

  resetPassword,
  forgotPassword,
  validateResetToken
};
