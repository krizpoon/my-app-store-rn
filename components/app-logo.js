import React from 'react';
import { PixelRatio } from 'react-native';
import FastImage from 'react-native-fast-image';

const selectImage = (images, containerHeight) => {
    if (!images || !images.length) {
        return null;
    }
    for (let img of images) {
        if (img.height >= containerHeight) {
            return img;
        }
    }
    return images[images.length - 1];
};

export const AppLogo = props => {
    const { images, style, size, round } = props;
    const image = selectImage(images, PixelRatio.getPixelSizeForLayoutSize(size));
    if (!image) {
        return null;
    }
    const uri = image.src;
    const dynamicStyle = { width: size, height: size, borderRadius: round ? size / 2 : 12 };
    return <FastImage style={[style, dynamicStyle]} source={{ uri }} />;
};

AppLogo.defaultProps = {
    size: 50,
};
