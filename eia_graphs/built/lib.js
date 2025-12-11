"use strict";
function deepFreeze(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj; // Exit if not an object or is null
    }
    // Recursively freeze properties (including arrays)
    Object.keys(obj).forEach((key) => {
        deepFreeze(obj[key]);
    });
    return Object.freeze(obj); // Freeze the current object
}
;
