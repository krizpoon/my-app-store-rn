type State = {
    loadingIds: ?{ [string]: boolean },
}

const initialState = { detailLoadingIds: {} };

function subtractKeys(map, keys) {
    let ret = map;
    if (keys && keys.length) {
        ret = { ...map };
        for (let key of keys) {
            delete ret[key];
        }
    }
    return ret;
}

function addKeys(map, keys, value) {
    let ret = map;
    if (keys && keys.length) {
        ret = { ...map };
        for (let key of keys) {
            ret[key] = value;
        }
    }
    return ret;
}

export default (state: State = initialState, action) => {
    switch (action.type) {
        case 'FETCH_APP_DETAILS_SUCCESS':
        case 'FETCH_APP_DETAILS_ERROR': {
            return { ...state, loadingIds: subtractKeys(state.loadingIds, action.payload.ids) };
        }
        case 'FETCH_APP_DETAILS_BEGIN': {
            return { ...state, loadingIds: addKeys(state.loadingIds, action.payload.ids) };
        }
        default:
            return state;
    }
};
