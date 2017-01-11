const clui = require('clui');
const Spinner = clui.Spinner;

export function yell(message) {
  return message ? new Spinner(message) : message;
}

export function testUrl(input) {
  return /^(http|https|git|ssh):\/\//i.test(input);
}
