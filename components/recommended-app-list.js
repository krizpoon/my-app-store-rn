import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { RecommendedAppListItem } from './recommended-app-list-item';
import { ColumnLayout } from './stack-layout';

const keyExtractor = item => String(item.id);

const ListHeight = 164;

const LoadingView = _ => {
    return <ColumnLayout style={styles.loading}><ActivityIndicator size="small" color="#ccc" /></ColumnLayout>;
};

const EmptyView = _ => {
    return <ColumnLayout style={styles.loading}><Text style={styles.empty}>找不到項目</Text></ColumnLayout>;
};

export const RecommendedAppList = props => {
    const { data, loading, onPressItem } = props;

    const renderItem = ({ item }) => {
        return <RecommendedAppListItem item={item} onPressItem={onPressItem} height={ListHeight} />;
    };

    return <>
        <Text style={styles.title}>推介</Text>
        {data && data.length ?
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
            /> : (loading ? <LoadingView /> : <EmptyView />)}
        <View style={styles.separator} />
    </>;
};

const styles = StyleSheet.create({
    title: {
        marginHorizontal: 15,
        marginTop: 15,
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    separator: {
        backgroundColor: '#ccc',
        height: StyleSheet.hairlineWidth,
    },
    contentContainer: {
        paddingHorizontal: 8,
    },
    loading: {
        height: ListHeight,
    },
    empty: {
        color: '#888',
        textAlign: 'center',
    },
});
