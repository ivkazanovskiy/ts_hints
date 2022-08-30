/**
 * @param str sting we want to check
 * @returns true if str is palindrome, false otherwise
 */
export function isPalindrome(str: string): boolean {
  return str === str.split("").reverse().join("");
}
