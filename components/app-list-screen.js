import React, { PureComponent, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { withSafeArea } from 'react-native-safe-area';
import { useDispatch, useSelector } from 'react-redux';
import { openAppDetail } from '../redux/actions/app-actions';
import { RecommendedAppList } from './recommended-app-list';
import { TopAppList } from './top-app-list';

const SafeInsetTopAppList = withSafeArea(class TopAppListC extends PureComponent {
    render() {
        return <TopAppList {...this.props} />;
    }
}, 'contentInset', 'horizontalAndBottom');

export function AppListScreen(props) {

    const dispatch = useDispatch();

    const topApps = useSelector(state => state.topApps.items);
    const hasMoreTopApps = useSelector(state => state.topApps.hasMore);
    const loadingTopApps = useSelector(state => state.topApps.fetching || state.topApps.loading);

    const recommendedApps = useSelector(state => state.recommendedApps.items);
    const loadingRecommendedApps = useSelector(state => state.recommendedApps.fetching || state.recommendedApps.loading);

    const refreshing = Boolean(loadingTopApps || loadingRecommendedApps);

    const refresh = () => {
        dispatch({ type: 'FETCH_TOP_APPS' });
        dispatch({ type: 'FETCH_RECOMMENDED_APPS' });
    };

    const loadMore = () => {
        dispatch({ type: 'LOAD_TOP_APPS' });
    };

    const onPressItem = item => {
        dispatch(openAppDetail(item));
    };

    const onViewingItems = items => {
        dispatch({ type: 'FETCH_APP_DETAILS', payload: { items } });
    };

    useEffect(refresh, [dispatch]);

    return (<>
        <StatusBar barStyle="dark-content" />
        <SafeInsetTopAppList
            items={topApps}
            hasMore={hasMoreTopApps}
            onPressItem={onPressItem}
            refreshing={refreshing}
            onRefresh={refresh}
            onEndReached={loadMore}
            onViewingItems={onViewingItems}
            header={(
                <RecommendedAppList data={recommendedApps} loading={loadingRecommendedApps} onPressItem={onPressItem} />
            )} />
    </>);
}
