import {
  clearAll,
  deleteScope,
  getScope,
  setScope,
  subscribe
} from "../dist/toukey";
import { describe, test, afterEach, expect } from "vitest";
import { KeyboardEvent } from "happy-dom";

function triggerKey(key, options = { keydown: true, keyup: false }) {
  if (options.keydown) {
    const event = new KeyboardEvent("keydown", { key });
    document.dispatchEvent(event);
  }
  if (options.keyup) {
    const event = new KeyboardEvent("keyup", { key });
    document.dispatchEvent(event);
  }
}

afterEach(clearAll);

describe("Subscribe single key", () => {
  test("Test keydown", (done) => {
    subscribe("a", (e) => {
      expect(e.key.toLowerCase()).toBe("a");
      done();
    });

    triggerKey("a");
  });

  test("Test keydown", (done) => {
    subscribe(
      "c",
      (e) => {
        expect(e.key.toLowerCase()).toBe("c");
        done();
      },
      { keydown: true }
    );

    triggerKey("c");
  });

  test("Test keyup", (done) => {
    subscribe(
      "b",
      (e) => {
        expect(e.key.toLowerCase()).toBe("b");
        done();
      },
      { keyup: true }
    );

    triggerKey("b", { keydown: true, keyup: true });
  });
});

describe("Subscribe compose key", () => {
  test("Keydown", (done) => {
    subscribe("ctrl+c", (e) => {
      expect(e.key.toLowerCase()).toBe("c");
      done();
    });

    triggerKey("Control");
    triggerKey("c");
  });

  test("keyup", (done) => {
    subscribe(
      "ctrl+c",
      (e) => {
        expect(e.key.toLowerCase()).toBe("c");
        done();
      },
      { keyup: true }
    );

    triggerKey("Control");
    triggerKey("c", { keydown: true, keyup: true });
  });

  test("Split", (done) => {
    subscribe(
      "ctrl-c",
      (e) => {
        expect(e.key.toLowerCase()).toBe("c");
        done();
      },
      { splitValue: "-" }
    );

    triggerKey("Control");
    triggerKey("c");
  });
});

describe("Subscribe multi key", () => {
  test("Test keydown", (done) => {
    subscribe("a,b", (e) => {
      expect(e.key.toLowerCase()).not.toBe("c");
      done();
    });

    triggerKey("a");
    triggerKey("b");
    triggerKey("c");
  });

  test("Test keyup", (done) => {
    subscribe(
      "a,b",
      (e) => {
        expect(e.key.toLowerCase()).not.toBe("c");
        done();
      },
      { keyup: true }
    );

    triggerKey("a", { keydown: true, keyup: true });
    triggerKey("b", { keydown: true, keyup: true });
    triggerKey("c", { keydown: true, keyup: true });
  });
});

describe("Scope", () => {
  test("Set scope", (done) => {
    subscribe(
      "a",
      (e) => {
        expect(e.key.toLowerCase()).toBe("a");
        done();
      },
      { scope: "main" }
    );

    setScope("main");
    triggerKey("a");
  });

  test("Get scope", () => {
    setScope("main");
    expect(getScope()).toBe("main");
  });

  test("Delete scope", (done) => {
    subscribe(
      "a",
      (e) => {
        expect(e.key.toLowerCase()).toBe("a");
        done();
      },
      { scope: "default" }
    );

    deleteScope("sub");
    triggerKey("a");
  });

  test("* scope", (done) => {
    let count = 0;
    const func = () => {
      if (count === 2) {
        done();
      }
    };

    subscribe(
      "a",
      (e) => {
        expect(e.key.toLowerCase()).toBe("a");
        count++;
        func();
      },
      { scope: "*" }
    );

    subscribe(
      "b",
      (e) => {
        expect(e.key.toLowerCase()).toBe("b");
        count++;
        func();
      },
      { scope: "other" }
    );

    setScope("other");
    triggerKey("a", { keydown: true, keyup: true });
    setTimeout(() => {
      triggerKey("b", { keydown: true, keyup: true });
    });
  });
});

describe("Ubsubscribe", () => {
  test("Test keydown", (done) => {
    const ubsubscribe = subscribe("a", (e) => {
      expect(e.key.toLowerCase()).toBe("a");
      done();
    });

    triggerKey("a");
    expect(ubsubscribe()).toBe(undefined);
  });
});

describe("Arrow", () => {
  test("ArrowLeft", (done) => {
    subscribe("left", (e) => {
      expect(e.key.toLowerCase()).toBe("arrowleft");
      done();
    });
    triggerKey("ArrowLeft");
  });

  test("ArrowRight", (done) => {
    subscribe("right", (e) => {
      expect(e.key.toLowerCase()).toBe("arrowright");
      done();
    });
    triggerKey("ArrowRight");
  });

  test("ArrowUp", (done) => {
    subscribe("up", (e) => {
      expect(e.key.toLowerCase()).toBe("arrowup");
      done();
    });
    triggerKey("ArrowUp");
  });

  test("ArrowBottom", (done) => {
    subscribe("bottom", (e) => {
      expect(e.key.toLowerCase()).toBe("arrowbottom");
      done();
    });
    triggerKey("ArrowBottom");
  });
});

describe("Invalid arguments", () => {
  test("Set wrong scope", () => {
    expect(() => {
      setScope(0);
    }).toThrow("scope must be string");
  });

  test("Set wrong key", () => {
    expect(() => {
      subscribe(0);
    }).toThrow("key must be string");
  });

  test("Set wrong handler", () => {
    expect(() => {
      subscribe("a", null);
    }).toThrow("handler must be function");
  });
});

describe("Valid options", (done) => {
  test("Options is string", () => {
    subscribe(
      "space",
      (e) => {
        expect(e.key.toLowerCase()).toBe("space");
        done();
      },
      "main"
    );

    setScope("main");
    triggerKey("space");
  });
});
