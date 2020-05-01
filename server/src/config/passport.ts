import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt as extractJwt } from 'passport-jwt'
import { secretOrKey } from './config'
import { User } from '../models/User.model'


const opts = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), secretOrKey
}

export const useStrategy = passport => {
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