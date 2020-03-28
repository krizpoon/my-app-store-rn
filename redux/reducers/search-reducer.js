const InitialState = {
    query: '',
    results: null,
};

export default (state = InitialState, action) => {
    switch (action.type) {
        case 'SEARCH_QUERY_CHANGE': {
            return { ...state, query: action.payload };
        }
        case 'CLEAR_SEARCH_RESULTS': {
            return { ...state, results: null };
        }
        default:
            break;
    }
    return state;
};
