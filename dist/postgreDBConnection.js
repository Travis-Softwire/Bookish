"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pgp = require('pg-promise')();
class PostgreDBConnection {
    constructor(connectionString) {
        this.db = pgp(connectionString);
    }
    getDB() {
        return this.db;
    }
}
exports.default = PostgreDBConnection;
//# sourceMappingURL=postgreDBConnection.js.map