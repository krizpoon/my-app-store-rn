import { combineEpics, ofType } from 'redux-observable';
import { catchError, mapTo } from 'rxjs/operators';
import { bootstrapEpic } from './app-actions';
import { fetchAndLoadRecommendedAppsEpic } from './recommended-app-actions';
import { searchQueryChangeEpic } from './search-actions';
import { fetchAndLoadTopAppsEpic, fetchDetailsEpic } from './top-app-actions';

const pingEpic = action$ => action$.pipe(
    ofType('PING'),
    mapTo({ type: 'PONG' }),
);

const epics = [
    pingEpic,
    bootstrapEpic,
    fetchDetailsEpic,
    fetchAndLoadTopAppsEpic,
    fetchAndLoadRecommendedAppsEpic,
    searchQueryChangeEpic,
];

export const rootEpic = (action$, store$, dependencies) =>
    combineEpics(...epics)(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        }),
    );
