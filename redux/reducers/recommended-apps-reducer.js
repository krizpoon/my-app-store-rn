// @flow

import type { AppEntry } from '../types';

type State = {
    fetching: boolean,
    loading: boolean,
    error: ?string,
    items: ?Array<AppEntry>,
    count: number,
    hasMore: boolean,
};

const initialState: State = {
    fetching: false,
    loading: false,
    error: null,
    items: null,
    count: 0,
    hasMore: false,
};

export default (state: State = initialState, action) => {
    switch (action.type) {
        case 'FETCH_RECOMMENDED_APPS_BEGIN': {
            return { ...state, fetching: true };
        }
        case 'FETCH_RECOMMENDED_APPS_ERROR': {
            return { ...state, fetching: false, error: action.payload.message };
        }
        case 'FETCH_RECOMMENDED_APPS_SUCCESS': {
            return { ...state, fetching: false, error: null };
        }
        case 'LOAD_RECOMMENDED_APPS_BEGIN': {
            return { ...state, loading: true };
        }
        case 'LOAD_RECOMMENDED_APPS_ERROR': {
            return { ...state, loading: false };
        }
        case 'LOAD_RECOMMENDED_APPS_SUCCESS': {
            const { items, count } = action.payload;
            const hasMore = items.length < count;
            return { ...state, items, count, loading: false, hasMore };
        }
        default:
            return state;
    }
};
