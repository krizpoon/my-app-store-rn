//  @Flow

type State = {
    ready: boolean,
};

const InitialState = {
    ready: false,
};

export default (state: State = InitialState, action) => {
    switch (action.type) {
        case  'APP_READY': {
            return { ...state, ready: true };
        }
        default:
            return state;
    }
};
