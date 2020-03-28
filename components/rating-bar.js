import React from 'react';
import { isFiniteNumber } from '../utils/object-utils';
import { StarIcon } from './icons/star-icon';
import { StarOutlineIcon } from './icons/star-outline-icon';
import { RowLayout } from './stack-layout';

const disabledColor = '#ccc';

export const RatingBar = props => {
    const { maxRating, rating, color, size } = props;
    const disabled = !isFiniteNumber(rating);
    const actualColor = disabled ? disabledColor : color;
    const stars = [];
    for (let i = 0; i < maxRating; i++) {
        if (i < rating) {
            stars.push(<StarIcon key={i} size={size} color={actualColor} />);
        } else {
            stars.push(<StarOutlineIcon key={i} size={size} color={actualColor} />);
        }
    }
    return <RowLayout>{stars}</RowLayout>;
};
RatingBar.defaultProps = {
    color: '#f70',
    size: 13,
};
