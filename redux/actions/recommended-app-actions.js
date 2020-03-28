import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, concatMap, filter } from 'rxjs/operators';
import { MaxRecommendedApps, recommendedAppsUrl } from '../../constants';
import { AppEntry } from '../../model/app-entry';
import { insertAppEntries, selectRecommendedAppEntries } from '../../service/apps-service';
import { concatArraysDistinctBy, getArray } from '../../utils/object-utils';

export const fetchAndLoadRecommendedAppsEpic = (action$, state$) => action$.pipe(
    ofType('FETCH_RECOMMENDED_APPS', 'LOAD_RECOMMENDED_APPS'),
    concatMap(action => {
        if (action.type === 'FETCH_RECOMMENDED_APPS') {
            return concat(
                of({ type: 'FETCH_RECOMMENDED_APPS_BEGIN' }),
                from((async () => {
                    const resp = await fetch(recommendedAppsUrl(MaxRecommendedApps));
                    const json = await resp.json();

                    const entries = getArray(json, 'feed.entry').map((app, index) => {
                        return Object.assign(AppEntry.fromFeedJson(app, { isRecommendedApp: 1, grossingRank: index + 1 }));
                    });
                    await insertAppEntries(entries);

                    return ({ type: 'FETCH_RECOMMENDED_APPS_SUCCESS' });
                })()),
                of({ type: 'LOAD_RECOMMENDED_APPS', payload: { clear: true } }),
            ).pipe(
                catchError(error => of({ type: 'FETCH_RECOMMENDED_APPS_ERROR', payload: error })),
            );
        } else if (action.type === 'LOAD_RECOMMENDED_APPS') {
            const clear = action.payload && action.payload.clear;
            return concat(
                of({ type: 'LOAD_RECOMMENDED_APPS_BEGIN' }),
                from((async () => {
                    const state = state$.value;
                    const items = state.recommendedApps.items;
                    const count = state.recommendedApps.count;
                    if (!clear && items && items.length === count) {
                        // done
                    } else {
                        // load next page
                        const query = state$.value.search.query;
                        const offset = (items && items.length) || 0;
                        const [nextItems, newCount] = await selectRecommendedAppEntries(query, clear ? 0 : offset, 10);
                        const newItems = clear ? nextItems : concatArraysDistinctBy('id', items, nextItems);
                        return ({ type: 'LOAD_RECOMMENDED_APPS_SUCCESS', payload: { items: newItems, count: newCount } });
                    }
                })()),
            ).pipe(
                catchError(error => of({ type: 'LOAD_RECOMMENDED_APPS_ERROR', payload: error })),
            );
        }
    }),
    filter(action => action),
);
