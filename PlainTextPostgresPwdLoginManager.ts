import LoginManager from "./loginManager";
import PasswordData from "./PasswordData";
import dbConnection from "./dbConnection";
const { ParameterizedQuery: PQ } = require('pg-promise');

export default class PlainTextPostgresPwdLoginManager implements LoginManager {
    private readonly db;

    constructor(dbConnection: dbConnection) {
        this.db = dbConnection.getDB();
    }

    async tryLogin(username: string, password: string): Promise<boolean> {
        const pwdQuery = new PQ({text: 'SELECT ("Password") FROM bookish."Users" WHERE "Username" = $1', values: [username]});
        try {
            const foundPassword = await this.retrieveSecret(username);
            return !!foundPassword && foundPassword === password;
        } catch (err: any) {
            console.log(err.message);
            return false;
        }
    }

    async retrieveSecret(username: string): Promise<string> {
        const pwdQuery = new PQ({text: 'SELECT ("Password") FROM bookish."Users" WHERE "Username" = $1', values: [username]});
        const foundPwdData: PasswordData = await this.db.one(pwdQuery);
        return foundPwdData.Password;
    }
}
