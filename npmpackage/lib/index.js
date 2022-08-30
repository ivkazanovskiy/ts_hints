"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPalindrome = void 0;
/**
 * @param str sting we want to check
 * @returns true if str is palindrome, false otherwise
 */
function isPalindrome(str) {
    return str === str.split("").reverse().join("");
}
exports.isPalindrome = isPalindrome;
//# sourceMappingURL=index.js.map