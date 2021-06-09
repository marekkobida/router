const _1 = document.getElementById('_1');
const _2 = document.getElementById('_2');
const _3 = document.getElementById('_3');
const _4 = document.getElementById('_4');
const _5 = document.getElementById('_5');
const _6 = document.getElementById('_6');

let savedRegExp = new RegExp();

function _66(e) {
  try {
    savedRegExp = globalThis.urlToRegExp(e.value);

    _2.value = savedRegExp;
    _3.value = JSON.stringify(savedRegExp.lexer, null, 2);
    _4.value = JSON.stringify(savedRegExp.parser, null, 2);
  } catch (error) {
    _2.value = '';
    _3.value = '';
    _4.value = error.toString();
  }
}

function _77(e) {
  try {
    const [_, ...found] = e.value.match(savedRegExp);
    _6.value = JSON.stringify(found, null, 2);
  } catch (error) {
    _6.value = error.toString();
  }
}

_66(_1);

_1.addEventListener('keyup', e => {
  _66(e.target);
  _77(_5);
});

_5.addEventListener('keyup', e => _77(e.target));

_77(_5);
