const jwt = require('jsonwebtoken');

module.exports.sendVerificationEmail = (user) => {
    const token = jwt.sign({ sub:user.id }, "super secret");

    const verificactionLink = `http://localhost:8000/api/users/${user.id}/verify?token=${token}`;

    console.log(`Sending verification email to ${user.email}: ${verificactionLink}`);
};