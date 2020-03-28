import { combineReducers } from 'redux';
import appDetails from './app-details-reducer';
import app from './app-reducer';
import recommendedApps from './recommended-apps-reducer';
import search from './search-reducer';
import topApps from './top-apps-reducer';

const reducers = {
    version: (state = 1) => state,
    appDetails,
    app,
    recommendedApps,
    search,
    topApps,
};

export default combineReducers(reducers);
