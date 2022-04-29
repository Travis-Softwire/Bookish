import { IDatabase } from 'pg-promise';

export default interface dbConnection {
    getDB(): IDatabase<any>;
}