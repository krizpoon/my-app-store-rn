import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { bufferTime, catchError, concatMap, filter, map, mergeAll, mergeMap } from 'rxjs/operators';
import { appDetailsUrl, MaxTopApps, topAppsUrl } from '../../constants';
import { AppEntry } from '../../model/app-entry';
import { insertAppEntries, resetAppsRanking, selectTopAppEntries, updateAppEntries } from '../../service/apps-service';
import { concatArraysDistinctBy, getArray } from '../../utils/object-utils';

export const fetchAndLoadTopAppsEpic = (action$, state$) => action$.pipe(
    ofType('FETCH_TOP_APPS', 'LOAD_TOP_APPS'),
    concatMap(action => {
        if (action.type === 'FETCH_TOP_APPS') {
            return concat(
                of({ type: 'FETCH_TOP_APPS_BEGIN' }),
                from((async () => {
                    const resp = await fetch(topAppsUrl(MaxTopApps));
                    const json = await resp.json();

                    const entries = getArray(json, 'feed.entry').map((app, index) => {
                        return Object.assign(AppEntry.fromFeedJson(app, { isTopApp: 1, hasDetails: 0, rank: index + 1 }));
                    });
                    await resetAppsRanking();
                    await insertAppEntries(entries);

                    return ({ type: 'FETCH_TOP_APPS_SUCCESS' });
                })()),
                of({ type: 'LOAD_TOP_APPS', payload: { clear: true } }),
            ).pipe(
                catchError(error => of({ type: 'FETCH_TOP_APPS_ERROR', payload: error })),
            );
        } else if (action.type === 'LOAD_TOP_APPS') {
            const clear = action.payload && action.payload.clear;
            return concat(
                of({ type: 'LOAD_TOP_APPS_BEGIN' }),
                from((async () => {
                    const state = state$.value;
                    const items = state.topApps.items;
                    const count = state.topApps.count;
                    if (!clear && items && items.length === count) {
                        // done
                    } else {
                        // load next page
                        const query = state$.value.search.query;
                        const offset = (items && items.length) || 0;
                        const [nextItems, newCount] = await selectTopAppEntries(query, clear ? 0 : offset, 10);
                        const newItems = clear ? nextItems : concatArraysDistinctBy('id', items, nextItems);
                        return ({ type: 'LOAD_TOP_APPS_SUCCESS', payload: { items: newItems, count: newCount } });
                    }
                })())
            ).pipe(
                catchError(error => of({ type: 'LOAD_TOP_APPS_ERROR', payload: error })),
            );
        }
    }),
    filter(action => action),
);

export const fetchDetailsEpic = (action$, $state) => action$.pipe(
    ofType('FETCH_APP_DETAILS'),
    map(action => (action.payload.items.filter(i => !i.hasDetails).map(i => i.id))),
    mergeAll(), // flatten array
    bufferTime(500), // enqueue ids in a 500ms window
    filter(ids => ids.length > 0), // skip empty
    map(ids => {
        // skip already loading items
        const state = $state.value;
        const alreadyLoading = state.appDetails.loadingIds || {};
        return ids.filter(id => !alreadyLoading[id]);
    }),
    filter(ids => ids.length > 0), // skip empty
    mergeMap(ids => concat(
        of({ type: 'FETCH_APP_DETAILS_BEGIN', payload: { ids } }),
        from((async () => {
            let detailItems = null;

            if (ids && ids.length) {
                const resp = await fetch(appDetailsUrl(ids));
                const json = await resp.json();
                detailItems = json && json.results && json.results.map(item => {
                    const id = String(item.trackId);
                    return {
                        id,
                        hasDetails: true,
                        averageUserRatingForCurrentVersion: item.averageUserRatingForCurrentVersion,
                        userRatingCountForCurrentVersion: item.userRatingCountForCurrentVersion,
                    };
                });

                updateAppEntries(detailItems).catch(ex => console.warn(ex));
            }
            return ({ type: 'FETCH_APP_DETAILS_SUCCESS', payload: { items: detailItems, ids } });
        })()),
    ).pipe(
        catchError(error => of({ type: 'FETCH_APP_DETAILS_ERROR', payload: { error, ids } })),
    )),
    filter(action => action),
);
