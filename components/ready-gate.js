import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnLayout } from './stack-layout';

export function ReadyGate(props) {
    const dispatch = useDispatch();
    const ready = useSelector(state => state.app.ready);
    useEffect(() => {
        dispatch({ type: 'APP_LAUNCH' });
    }, [dispatch]);

    if (ready) {
        return props.children;
    } else {
        return <ColumnLayout fill>
            <ActivityIndicator size="large" color="#ccc" />
        </ColumnLayout>;
    }
}
