const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const {
    google: { googleConfig },
} = require('../config/');
const { user: userService } = require('../services');

// Google Plus Strategy
const googleStrategy = new GooglePlusTokenStrategy(
    googleConfig,
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getByEmail(profile.emails[0]);
            // si el usuario no ha sido registrado anteriormente
            if (!user) {
                // obtenemos los valores de nuestro perfil de google
                const { displayName, photos, emails } = profile;
                const [avatar] = photos;
                const [email] = emails;

                // creamos el usuario con los valores
                user = await userService.create({
                    email: email?.value,
                    username: displayName,
                    imageUrl: avatar?.value,
                });
            }
            // retornamos usuario + token
            const { username, email, id } = user;
            user = userService.toAuthJson({ username, email, id });
            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    }
);

passport.use(googleStrategy);
const authGoogle = passport.authenticate('google-plus-token', {
    session: false,
});

module.exports = authGoogle;
