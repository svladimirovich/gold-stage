// To redefine default heroku environment settings you should
// create local config files using command $ node config.generate
// then edit client and server config files to redefine settings

export interface IServerConfiguration {
    /* process.env.PORT */
    Port: number;
    /* process.env.DATABASE_URI */
    DatabaseUri: string;
}

export interface IClientConfiguration {
    /* process.env.HOST_BASE_URL */
    BaseUrl: string;
}