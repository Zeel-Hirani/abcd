const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";

async function signupToken(payload) {
  let token = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "12h",
  });
  return token;
}
module.exports = { signupToken };
