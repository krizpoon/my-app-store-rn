import { Linking } from 'react-native';
import { ofType } from 'redux-observable';
import { mapTo, mergeMapTo } from 'rxjs/operators';
import { setupDatabaseConnectionPool } from '../../model';

export const bootstrapEpic = action$ => action$.pipe(
    ofType('APP_LAUNCH'),
    mergeMapTo(setupDatabaseConnectionPool()),
    mapTo({ type: 'APP_READY' }),
);

export const openAppDetail = item => _ => {
    if (item.link) {
        Linking.openURL(item.link).catch(err => console.log(`Error opening URL: ${item.link}`, err));
    }
};
