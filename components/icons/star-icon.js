import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

const Icon = props => {
    const { style, color, size } = props;
    return (
        <Svg viewBox="-10 0 522 512" style={style} width={size} height={size}>
            <G transform="matrix(1 0 0 -1 0 448)">
                <Path fill={color} d="M256 80l132 -80l-35 150l116 101l-153 13l-60 141l-60 -141l-153 -13l116 -101l-35 -150z" />
            </G>
        </Svg>
    );
};

Icon.defaultProps = { color: 'black', size: 24 };

export const StarIcon = Icon;

export default Icon;
