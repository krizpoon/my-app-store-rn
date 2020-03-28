import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { withSafeArea } from 'react-native-safe-area';
import { useDispatch, useSelector } from 'react-redux';

function getContentInsertTop(props) {
    return (props && props.contentInset && props.contentInset.top) || 0;
}

const SearchBar2 = withSafeArea(class extends PureComponent {
    state = {};

    static getDerivedStateFromProps(props, state) {

        let ret = null;

        if (!state || !state.props ||
            getContentInsertTop(props) !== getContentInsertTop(state.props)
        ) {
            const top = Math.max(12, getContentInsertTop(props));

            const containerStyle = { paddingTop: top };
            const cancelButtonProps = {
                buttonStyle: { marginTop: top - 12 },
            };

            ret = { ...ret, props, containerStyle, cancelButtonProps };
        }

        return ret;
    }

    render() {
        const { contentInset, contentOffset, ...rest } = this.props;
        const { containerStyle, cancelButtonProps } = this.state;
        return <SearchBar {...rest} containerStyle={containerStyle} cancelButtonProps={cancelButtonProps} />;
    }
}, 'contentInset', 'top');

export const AppSearchBar = props => {
    const dispatch = useDispatch();
    const value = useSelector(state => state.search.query);
    const onChangeText = text => dispatch({ type: 'SEARCH_QUERY_CHANGE', payload: text });

    return <SearchBar2 platform={Platform.OS} placeholder='搜尋' value={value} onChangeText={onChangeText} />;
};
