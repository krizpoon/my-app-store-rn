import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TopAppLogoSize } from '../constants';
import { isFiniteNumber } from '../utils/object-utils';
import { AppLogo } from './app-logo';
import { RatingBar } from './rating-bar';
import { ColumnLayout, RowLayout } from './stack-layout';

export class TopAppListItem extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.item !== nextProps.item;
    }

    render() {
        const { item, onPressItem } = this.props;
        console.log('xxx render', item.id);
        const rank = item.rank;
        const onPress = onPressItem ? () => onPressItem(item) : null;
        return (
            <TouchableOpacity onPress={onPress}>
                <RowLayout style={styles.appEntry}>
                    <Text style={styles.rank}>{rank}</Text>
                    <AppLogo images={item.logos} size={TopAppLogoSize} style={styles.logo} round={rank % 2 === 0} />
                    <ColumnLayout style={styles.infoBox} justify='space-around'>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.category}>{item.categoryName}</Text>
                        <RowLayout justify='flex-start'>
                            <RatingBar maxRating={5} rating={item.averageUserRatingForCurrentVersion} />
                            {isFiniteNumber(item.userRatingCountForCurrentVersion) ? <Text style={styles.rating}>
                                ({item.userRatingCountForCurrentVersion})
                            </Text> : null}
                        </RowLayout>
                    </ColumnLayout>
                </RowLayout>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    appEntry: {
        backgroundColor: Colors.white,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    rank: {
        fontSize: 22,
        fontWeight: '300',
        color: '#888',
        minWidth: 36,
        textAlign: 'center',
    },
    logo: {
        marginHorizontal: 15,
    },
    infoBox: {
        flex: 1,
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
    },
    category: {
        fontSize: 12,
        fontWeight: '400',
        color: '#888',
    },
    rating: {
        fontSize: 11,
        fontWeight: '400',
        color: '#888',
    },
});
