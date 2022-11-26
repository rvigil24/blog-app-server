const { authRouter } = require('./auth.route');
const { categoryRouter } = require('./category.route');
const { postRouter } = require('./post.route');
const { userRouter } = require('./user.route');

module.exports = {
    authRouter,
    categoryRouter,
    postRouter,
    userRouter,
};
