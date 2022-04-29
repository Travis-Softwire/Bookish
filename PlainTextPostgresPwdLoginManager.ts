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
            const foundPwdData: PasswordData = await this.db.one(pwdQuery);
            return password === foundPwdData.Password;
        } catch (err: any) {
            console.log(err.message);
            return false;
        }
    }
}
