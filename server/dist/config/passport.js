"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const User_model_1 = require("../models/User.model");
// const secretOrKey = process.env.SECRET_OR_KEY
exports.useStrategy = (passport, secretOrKey) => {
    const opts = {
        jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey
    };
    passport.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
        User_model_1.User.findOne({ where: { id: jwtPayload.id } })
            .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(err => console.log(err));
    }));
};
//# sourceMappingURL=passport.js.map