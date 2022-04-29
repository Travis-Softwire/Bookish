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
Object.defineProperty(exports, "__esModule", { value: true });
const pgp = require('pg-promise')();
const { ParameterizedQuery: PQ } = require('pg-promise');
class PlainTextPwdLoginManager {
    constructor(connectionString) {
        this.db = pgp(connectionString);
    }
    tryLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pwdQuery = new PQ({ text: 'SELECT ("Password") FROM bookish."Users" WHERE "Username" = $1', values: [username] });
            try {
                const foundPwd = yield this.db.one(pwdQuery);
                console.log(`Sent username: ${username} & password: ${password}, received response: ${JSON.stringify(foundPwd)}`);
                return password === foundPwd;
            }
            catch (err) {
                console.log(err.message);
                return false;
            }
        });
    }
}
exports.default = PlainTextPwdLoginManager;
//# sourceMappingURL=PlainTextPwdLoginManager.js.map