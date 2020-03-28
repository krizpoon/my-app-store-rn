import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

type Align = 'stretch' | 'flex-start' | 'flex-end' | 'center';

type Props = {
    align: Align,
    justify: Justify,
};

type StackLayoutProps = {
    ...Props,
    direction: string,
};

const StackLayout = (props: StackLayoutProps) => {
    const { children, style, direction, align, justify, fill } = props;

    const [dynamicStyle, setDynamicStyle] = useState(null);

    useEffect(() => {
        const style = {};
        style.flexDirection = direction;
        style.alignItems = align;
        style.justifyContent = justify;
        if (fill) {
            style.flex = 1;
        }
        setDynamicStyle(style);
    }, [direction, align, justify, fill]);

    return <View style={[dynamicStyle, style]}>{children}</View>;
};

export const RowLayout = (props: Props) => {
    return <StackLayout {...props} direction="row" />;
};
RowLayout.defaultProps = {
    align: 'center', // vertical align
    justify: 'space-between', // horizontal align
};

export const ColumnLayout = (props: Props) => {
    return <StackLayout {...props} direction="column" />;
};
ColumnLayout.defaultProps = {
    align: 'stretch', // horizontal align
    justify: 'center', // vertical align
};
