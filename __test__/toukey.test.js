import { clearAll, deleteScope, getScope, setScope, subscribe } from '../src/index'
import 'jsdom'

function triggerKey(key, options = { keydonw: true, keyup: false }) {
  let type = 'keydown';
  if (options.keydonw) {
    type = 'keydown';
  } else if (options.keyup) {
    type = 'false';
  }
  const event = new window.KeyboardEvent(type, { key });
  document.dispatchEvent(event);
}

afterEach(clearAll);

describe('Subscribe single key', () => {
  test('Test keydonw', () => {
    subscribe('a', e => {
      expect(e.key.toLowerCase()).toBe('a');
    });

    triggerKey('a');
  });

  test('Test keydonw', () => {
    subscribe('c', e => {
      expect(e.key.toLowerCase()).toBe('c');
    }, {keydonw: true});

    triggerKey('c');
  });

  test('Test keyup', () => {
    subscribe('b', e => {
      expect(e.key.toLowerCase()).toBe('b');
    }, { keyup: true });

    triggerKey('b', { keyup: true });
  });
});

describe('Subscribe compose key', () => {
  test('Keydown', () => {
    subscribe('ctrl+c', e => {
      expect(e.key.toLowerCase()).toBe('c');
    });

    triggerKey('Control');
    triggerKey('c');
  });

  test('keyup', () => {
    subscribe('ctrl+c', e => {
      expect(e.key.toLowerCase()).toBe('c');
    }, { keyup: true });

    triggerKey('Control');
    triggerKey('c', { keyup: true });
  });

  test('Split', () => {
    subscribe('ctrl-c', e => {
      expect(e.key.toLowerCase()).toBe('c');
    }, { splitValue: '-' });

    triggerKey('Control');
    triggerKey('c');
  });
});

describe('Subscribe multi key', () => {
  test('Test keydonw', () => {
    subscribe('a,b', e => {
      expect(e.key.toLowerCase()).not.toBe('c');
    });

    triggerKey('a');
    triggerKey('b');
    triggerKey('c');
  });

  test('Test keyup', () => {
    subscribe('a,b', e => {
      expect(e.key.toLowerCase()).not.toBe('c');
    }, { keyup: true });

    triggerKey('a', { keyup: true });
    triggerKey('b', { keyup: true });
    triggerKey('c', { keyup: true });
  });
});

describe('Scope', () => {
  test('Set scope', () => {
    subscribe('a', e => {
      expect(e.key.toLowerCase()).toBe('a');
    }, { scope: 'main' });

    setScope('main');
    triggerKey('a');
  });

  test('Get scope', () => {
    setScope('main');
    expect(getScope()).toBe('main');
  });

  test('Delete scope', () => {
    subscribe('a', e => {
      expect(e.key.toLowerCase()).toBe('a');
    }, { scope: 'default' });

    deleteScope('sub');
    triggerKey('a');
  });

  test('* scope', () => {

    subscribe('a', e => {
      expect(e.key.toLowerCase()).toBe('a');
    }, { scope: '*' });

    subscribe('b', e => {
      expect(e.key.toLowerCase()).toBe('b');
    }, { scope: 'other' });

    setScope('other');
  });
});

describe('Ubsubscribe', () => {
  test('Test keydonw', () => {
    const ubsubscribe = subscribe('a', e => {
      expect(e.key.toLowerCase()).toBe('a');
    });

    triggerKey('a');
    expect(ubsubscribe()).toBe(undefined);
  });
});

describe('Arrow', () => {
  test('ArrowLeft', () => {
    subscribe('left', e => {
      expect(e.key.toLowerCase()).toBe('arrowleft');
    });
    triggerKey('ArrowLeft');
  });

  test('ArrowRight', () => {
    subscribe('right', e => {
      expect(e.key.toLowerCase()).toBe('arrowright');
    });
    triggerKey('ArrowRight');
  });

  test('ArrowUp', () => {
    subscribe('up', e => {
      expect(e.key.toLowerCase()).toBe('arrowup');
    });
    triggerKey('ArrowUp');
  });

  test('ArrowBottom', () => {
    subscribe('bottom', e => {
      expect(e.key.toLowerCase()).toBe('arrowdown');
    });
    triggerKey('ArrowBottom');
  });
});

describe('Invalid arguments', () => {
  test('Set wrong scope', () => {
    expect(() => { setScope(0) }).toThrow("scope must be string");
  });

  test('Set wrong key', () => {
    expect(() => { subscribe(0) }).toThrow("key must be string");
  });

  test('Set wrong handler', () => {
    expect(() => { subscribe('a', null) }).toThrow("handler must be function");
  });
});

describe("Valid options", () => {
  test('Options is string', () => {
    subscribe('space', (e) => {
      expect(e.key.toLowerCase()).toBe('space');
    }, 'main');

    setScope('main');
    triggerKey('space');
  });
});