const User = require('./User');
const Gift = require('./Gift');
const TokenBlacklist = require('./TokenBlacklist');

// Gift.create({ name: "Smart TV", description: "Last model Smart TV.", imageUrl: "https://res.cloudinary.com/dux8m4bux/image/upload/v1575668676/smartTv.jpg" });
let usersCnt = 0;
User.find().then(users => usersCnt = users.length);
const user = {
    username: "asd",
    password: "dsad",
    isAdmin: (usersCnt == 2)
}
console.log(user)

module.exports = {
    User,
    Gift,
    TokenBlacklist
};