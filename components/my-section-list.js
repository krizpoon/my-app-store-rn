import React, { PureComponent } from 'react';
import { Platform, SectionList } from 'react-native';

const iOS = Platform.OS === 'ios';

export class MySectionList extends PureComponent {
    state = {};

    static getDerivedStateFromProps(props, state) {

        let ret = null;

        if (!state || !state.props ||
            props.contentInset !== state.props.contentInset ||
            props.contentOffset !== state.props.contentOffset
        ) {
            const { contentInset: contentInsetProp, contentOffset: contentOffsetProp } = props;

            // Fix a SectionList bug that horizontal insets aren't being handled correctly
            const contentInset = contentInsetProp ? { ...contentInsetProp, left: 0, right: 0 } : null;
            const contentOffset = contentOffsetProp ? { ...contentOffsetProp, x: 0 } : null;
            const contentContainerStyle = contentInsetProp ? { paddingLeft: contentInsetProp.left, paddingRight: contentInsetProp.right } : null;

            ret = { ...ret, props, contentInset, contentOffset, contentContainerStyle };
        }

        return ret;
    }

    // provide a stable function for inner FlatList to avoid complaints
    handleViewableItemsChanged = info => {
        const { onViewableItemsChanged } = this.props;
        onViewableItemsChanged && onViewableItemsChanged(info);
    };

    render() {
        const { contentInset, contentOffset, contentContainerStyle } = this.state;
        return <SectionList
            keyboardDismissMode={iOS ? 'interactive' : 'none'}
            {...this.props}
            contentInset={contentInset}
            contentOffset={contentOffset}
            contentContainerStyle={contentContainerStyle}
            onViewableItemsChanged={this.handleViewableItemsChanged}
        />;
    }
}
