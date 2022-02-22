const {subscribe, getScope, setScope, deleteScope} = toukey;

const unsub1 = subscribe('a', () => {
  console.log('a keydown');
});

const unsub2 = subscribe('b,c', () => {
  console.log('b or c keydown');
});