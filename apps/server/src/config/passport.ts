import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt as extractJwt } from 'passport-jwt'
import { User } from '../models/User.model'
// const secretOrKey = process.env.SECRET_OR_KEY



export const useStrategy = (passport, secretOrKey) => {
    const opts = {
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), secretOrKey
    }

    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
          User.findOne({ where: { id: jwtPayload.id } })
                .then(user => {
                    if (user) {
                        return done(null, user)
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}