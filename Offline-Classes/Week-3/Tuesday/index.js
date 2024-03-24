const jwt = require("jsonwebtoken");
const value = {
  name: "Adarsh Singh",
  accountNumber: 21801332133,
};

// Token Created
const token = jwt.sign(value, "JWT_SECRET=294i0348u321");
console.log(token);

// Token Verified:
const tokenVerify = jwt.verify(token, "JWT_SECRET=294i0348u321");
console.log(tokenVerify);

if (
  tokenVerify.name === value.name &&
  tokenVerify.accountNumber === value.accountNumber
) {
  console.log(true);
} else {
  console.log(false);
} 

// Token Decoded
const tokenDecoded = jwt.verify(token, "JWT_SECRET=294i0348u321");
console.log(tokenDecoded);
