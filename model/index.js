import { createConnection, getConnection } from 'typeorm/browser';
import { AppEntry } from './app-entry';

export const setupDatabaseConnectionPool = async () => {
    try {
        return getConnection();
    } catch (ex) {
        return createConnection({
            type: 'react-native',
            database: 'data.sqlite',
            location: 'default',
            logging: ['error'],
            // logging: ['error', 'query', 'schema'],
            synchronize: true,
            entities: [
                AppEntry,
            ],
        });
    }
};

export const withConnection = async cb => {
    let cn = null;
    try {
        cn = getConnection();
        return await cb(cn);
    } finally {
        if (cn) {
            // cn.close().catch(_ => {}); // no need to close
        }
    }
};
