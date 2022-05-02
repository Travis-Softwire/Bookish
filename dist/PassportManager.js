"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const PassportStrategyType_1 = __importDefault(require("./PassportStrategyType"));
const JwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
class PassportManager {
    constructor(passport, loginManager, secret) {
        this.passport = passport;
        this.loginManager = loginManager;
        this.secret = secret;
    }
    configurePassportWithStrategy(strategyType) {
        if (strategyType === PassportStrategyType_1.default.JWT) {
            this.configureJWTStrategy();
        }
        else if (strategyType === PassportStrategyType_1.default.USER_PWD) {
            this.configureUserPwdStrategy();
        }
    }
    configureUserPwdStrategy() {
        this.passport.use('login', new localStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => __awaiter(this, void 0, void 0, function* () {
            const loggedIn = yield this.loginManager.tryLogin(username, password);
            if (loggedIn) {
                done(null, { user: username }, { message: 'Logged in' });
            }
            else {
                done(null, false, { message: 'Invalid username or password.' });
            }
        })));
    }
    configureJWTStrategy() {
        const opts = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = this.secret;
        passport_1.default.use('jwt', new JwtStrategy(opts, (token, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = token.user;
                return done(null, user);
            }
            catch (error) {
                done(error);
            }
        })));
    }
}
exports.default = PassportManager;
//# sourceMappingURL=PassportManager.js.map