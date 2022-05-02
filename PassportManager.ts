import LoginManager from "./loginManager";
import passport, {PassportStatic} from "passport";
import PassportStrategyType from "./PassportStrategyType";
const JwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

export default class PassportManager {
    private readonly passport: PassportStatic;
    private readonly loginManager: LoginManager;
    private readonly secret: string;

    constructor(passport: PassportStatic, loginManager: LoginManager, secret: string) {
       this.passport = passport;
       this.loginManager = loginManager;
       this.secret = secret;
    }

    configurePassportWithStrategy(strategyType: PassportStrategyType): void {
        if (strategyType === PassportStrategyType.JWT) {
            this.configureJWTStrategy();
        } else if (strategyType === PassportStrategyType.USER_PWD) {
            this.configureUserPwdStrategy();
        }
    }

    configureUserPwdStrategy(): void {
        this.passport.use('login', new localStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            async (username: string, password: string, done: any) => {
                const loggedIn = await this.loginManager.tryLogin(username, password);
                if (loggedIn) {
                    done(null, {user: username}, { message: 'Logged in' });
                } else {
                    done(null, false, { message: 'Invalid username or password.'});
                }
            }
        ));
    }

    configureJWTStrategy(): void {
        const opts: any = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = this.secret;

        passport.use('jwt', new JwtStrategy(opts, async (token: any, done: any) => {
            try {
                const user = token.user;
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }));
    }
}