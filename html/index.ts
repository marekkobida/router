import urlToRegExp from '../urlToRegExp/index.js';

function $(elementId: string) {
  return document.getElementById(elementId) as HTMLTextAreaElement;
}

let pattern = new RegExp('');

function _1() {
  try {
    pattern = urlToRegExp($('_1').value);

    $('_2').value = pattern.toString();
    $('_3').value = JSON.stringify(pattern.lexer, null, 2);
    $('_4').value = JSON.stringify(pattern.parser, null, 2);
  } catch (error) {
    $('_2').value = '';
    $('_3').value = '';
    $('_4').value = error.toString();
  }
}

function _2() {
  try {
    $('_6').value = JSON.stringify($('_5').value.match(pattern), null, 2);
  } catch (error) {
    $('_6').value = error.toString();
  }
}

[$('_1'), $('_5')].forEach(_ =>
  _?.addEventListener('keyup', () => {
    _1();
    _2();
  })
);

_1();
_2();
