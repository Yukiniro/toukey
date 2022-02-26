const {subscribe, getScope, setScope, deleteScope} = toukey;

function log(value) {
  document.body.innerText = value;
}

const unsub0 = subscribe('alt', () => {
  log('alt keydown');
});

const unsub1 = subscribe('a', () => {
  log('a keydown');
});

const unsub2 = subscribe('b,c', () => {
  log('b or c keydown');
});

const unsub3 = subscribe('ctrl+c', () => {
  log('ctrl+c keydown');
});

const unsub4 = subscribe('q', () => {
  log('q keyup');
}, {keyup: true});