const passport = require('passport');
const LocalStrategy = require('passport-local');
const { user: userService } = require('../services');

// establecer estrategia de autenticacion con correo y password
const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
    let user = await userService.getByEmail(email);
    if (user) {
        const validPassword = await userService.comparePassword(user, password);
        if (!validPassword) {
            return done(null, false, {
                message: 'Incorrect email or password.',
            });
        }
        const { username, email, id } = user;
        user = userService.toAuthJson({ username, email, id });
        return done(null, user);
    } else {
        return done(null, false, {
            message: 'Email does not exist',
        });
    }
});

passport.use(localStrategy);
const authEmail = passport.authenticate('local', {
    session: false,
});

module.exports = authEmail;
