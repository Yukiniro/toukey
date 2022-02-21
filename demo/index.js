const {subscribe, getScope, setScope, deleteScope} = toukey;

const unsub1 = subscribe('a', () => {
  console.log('a keydonw');
});