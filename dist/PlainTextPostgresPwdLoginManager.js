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
const { ParameterizedQuery: PQ } = require('pg-promise');
class PlainTextPostgresPwdLoginManager {
    constructor(dbConnection) {
        this.db = dbConnection.getDB();
    }
    tryLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pwdQuery = new PQ({ text: 'SELECT ("Password") FROM bookish."Users" WHERE "Username" = $1', values: [username] });
            try {
                const foundPwdData = yield this.db.one(pwdQuery);
                return password === foundPwdData.Password;
            }
            catch (err) {
                console.log(err.message);
                return false;
            }
        });
    }
}
exports.default = PlainTextPostgresPwdLoginManager;
//# sourceMappingURL=PlainTextPostgresPwdLoginManager.js.map