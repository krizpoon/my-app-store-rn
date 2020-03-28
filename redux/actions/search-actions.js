import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

export const searchQueryChangeEpic = action$ => action$.pipe(
    ofType('SEARCH_QUERY_CHANGE'),
    flatMap(() => of(
        { type: 'LOAD_TOP_APPS', payload: { clear: true } },
        { type: 'LOAD_RECOMMENDED_APPS', payload: { clear: true } },
    )),
);
