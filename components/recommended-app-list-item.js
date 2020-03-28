import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RecommendedAppLogoSize } from '../constants';
import { AppLogo } from './app-logo';
import { ColumnLayout } from './stack-layout';

export class RecommendedAppListItem extends Component {
    state = {};

    static getDerivedStateFromProps(props, state) {

        let ret = null;

        if (!state || !state.props ||
            props.height !== state.props.height
        ) {
            const { height } = props;
            const rootStyle = { height };
            ret = { ...ret, props, rootStyle };
        }

        return ret;
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.item !== nextProps.item || this.props.height !== nextProps.height);
    }

    handlePress = () => {
        const { item, onPressItem } = this.props;
        onPressItem && onPressItem(item);
    };

    render() {
        const { item } = this.props;
        const { rootStyle } = this.state;
        return (<TouchableOpacity onPress={this.handlePress}>
            <ColumnLayout style={[styles.root, rootStyle]} justify='flex-start'>
                <AppLogo images={item.logos} style={styles.logo} size={RecommendedAppLogoSize} />
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.category}>{item.categoryName}</Text>
            </ColumnLayout>
        </TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
    root: {
        paddingVertical: 15,
        marginHorizontal: 8,
        width: RecommendedAppLogoSize,
    },
    logo: {
        marginVertical: 4,
    },
    name: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000',
        marginVertical: 4,
    },
    category: {
        fontSize: 12,
        fontWeight: '400',
        color: '#888',
        marginVertical: 4,
    },
});
