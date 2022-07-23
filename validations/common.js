'use strict';

function isEmptyString(o) {
    return o === undefined || o === null || o === '' || !/^[a-zA-Z]+$/.test(o);
}

function isValidItem(o) {
    return !(o === undefined && o === null && isNaN(o));
}

module.exports = {
    isEmptyString,
    isValidItem
}