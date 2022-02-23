const {subscribe, getScope, setScope, deleteScope} = toukey;

const unsub1 = subscribe('a', () => {
  console.log('a keydown');
});

const unsub2 = subscribe('b,c', () => {
  console.log('b or c keydown');
});

const unsub3 = subscribe('ctrl+c', () => {
  console.log('ctrl+c keydown');
});

const unsub4 = subscribe('q', () => {
  console.log('q keyup');
}, {keyup: true});