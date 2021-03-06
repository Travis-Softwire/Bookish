export default interface LoginManager {
    tryLogin(username: string, secret: string): Promise<boolean>;
    retrieveSecret(username: string): Promise<string>;
}