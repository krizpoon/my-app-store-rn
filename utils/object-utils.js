import get from 'lodash/get';

export const getArray = (obj, key) => {
    let value = get(obj, key);
    if (Array.isArray(value)) {
        return value;
    } else {
        return [];
    }
};

export function isFiniteNumber(num) {
    return typeof num === 'number' && !isNaN(num) && isFinite(num);
}

export const jsonParse = (json, defaultValue = null) => {
    if (!json) {
        return defaultValue;
    }
    try {
        return JSON.parse(json);
    } catch (ex) {
        return defaultValue;
    }
};

const _makeEnumerable = (enumerable, obj, ...properties) => {
    const prototype = Object.getPrototypeOf(obj);
    for (let property of properties) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, property) || Object.getOwnPropertyDescriptor(obj, property) || null;
        if (descriptor) {
            const modifiedDescriptor = Object.assign(descriptor, { enumerable });
            Object.defineProperty(obj, property, modifiedDescriptor);
        }
    }
};

export const makeEnumerable = (obj, ...properties) => {
    _makeEnumerable(true, obj, ...properties);
};

export const makeNonEnumerable = (obj, ...properties) => {
    _makeEnumerable(false, obj, ...properties);
};

export const concatArraysDistinctBy = (key, ...arrays) => {
    const set = new Set();
    const ret = [];
    for (let arr of arrays) {
        if (arr) {
            for (let a of arr) {
                if (a && !set.has(a[key])) {
                    ret.push(a);
                }
            }
        }
    }
    return ret;
};
