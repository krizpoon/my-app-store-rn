// @flow

import keyBy from 'lodash/keyBy';
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
    hasMore: true,
};

export default (state: State = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TOP_APPS_BEGIN': {
            return { ...state, fetching: true };
        }
        case 'FETCH_TOP_APPS_ERROR': {
            return { ...state, fetching: false, error: action.payload.message };
        }
        case 'FETCH_TOP_APPS_SUCCESS': {
            return { ...state, fetching: false, error: null };
        }
        case 'LOAD_TOP_APPS_BEGIN': {
            return { ...state, loading: true };
        }
        case 'LOAD_TOP_APPS_ERROR': {
            return { ...state, loading: false };
        }
        case 'LOAD_TOP_APPS_SUCCESS': {
            const { items, count } = action.payload;
            const hasMore = items.length < count;
            return { ...state, items, count, loading: false, hasMore };
        }
        case 'FETCH_APP_DETAILS_SUCCESS': {
            let newItems = state.items;
            if (state.items) {
                const { items } = action.payload;
                const byId = keyBy(items, 'id');

                newItems = state.items.map(item => {
                    const details = byId[item.id];
                    if (details) {
                        return Object.assign({}, item, details);
                    }
                    return item;
                });
                return { ...state, items: newItems };
            }
            break;
        }
        default:
            break;
    }
    return state;
};
