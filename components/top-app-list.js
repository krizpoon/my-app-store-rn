import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { concatArraysDistinctBy } from '../utils/object-utils';
import { AppSearchBar } from './app-search-bar';
import { MySectionList } from './my-section-list';
import { RowLayout } from './stack-layout';
import { TopAppListItem } from './top-app-list-item';

const keyExtractor = (item, index) => String(item.id) + index;

const ItemSeparatorComponent = ({ highlighted }) => (
    <View style={styles.separator} />
);

const MoreIndicatorRow = _ => {
    return <RowLayout fill justify="center" style={styles.metaRow}><ActivityIndicator size="small" color="#ccc" /></RowLayout>;
};

const EmptyIndicatorRow = _ => {
    return <RowLayout fill justify='center' style={styles.metaRow}><Text style={styles.empty}>找不到項目</Text></RowLayout>;
};

const viewabilityConfig = {
    minimumViewTime: 100,
    itemVisiblePercentThreshold: 0,
    waitForInteraction: false,
};

export const TopAppList = props => {
    const {
        items, hasMore, onPressItem, refreshing, onRefresh, onEndReached, onViewingItems, header,
        contentInset, contentOffset,
    } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(concatArraysDistinctBy('id', [{ id: 'header' }], items, hasMore ? [{ id: 'more' }] : null));
    }, [items, hasMore]);

    const renderItem = ({ item }) => {
        if (item.id === 'header') {
            return header;
        } else if (item.id === 'more') {
            return <MoreIndicatorRow />;
        }
        return <TopAppListItem item={item} onPressItem={onPressItem} />;
    };

    const renderSectionHeader = ({ section }) => {
        return <AppSearchBar />;
    };

    const onViewableItemsChanged = (info) => {
        const visibleItems = info.viewableItems.filter(row => row.key !== 'more').map(row => row.item);
        onViewingItems && onViewingItems(visibleItems);
    };

    return <MySectionList
        contentInset={contentInset}
        contentOffset={contentOffset}
        sections={[{ data }]}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={EmptyIndicatorRow}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
    />;
};

const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#ccc',
        height: StyleSheet.hairlineWidth,
        marginLeft: 20,
    },
    metaRow: {
        paddingVertical: 15,
    },
    empty: {
        color: '#888',
        textAlign: 'center',
    },
});
