import dbConnection from "./dbConnection";
import {IDatabase} from "pg-promise";
const pgp = require('pg-promise')();


export default class PostgreDBConnection implements dbConnection {
    private readonly db: IDatabase<any>;

    constructor(connectionString: string) {
        this.db = pgp(connectionString);
    }

    getDB(): IDatabase<any> {
        return this.db;
    }
}