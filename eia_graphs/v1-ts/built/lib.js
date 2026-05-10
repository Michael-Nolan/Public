"use strict";
function deepFreeze(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    // Handle Map
    if (obj instanceof Map) {
        obj.forEach((value) => {
            deepFreeze(value);
        });
        return Object.freeze(obj);
    }
    // Handle Set
    if (obj instanceof Set) {
        obj.forEach((value) => {
            deepFreeze(value);
        });
        return Object.freeze(obj);
    }
    // Recursively freeze properties (including arrays)
    Object.keys(obj).forEach((key) => {
        deepFreeze(obj[key]);
    });
    return Object.freeze(obj);
}
