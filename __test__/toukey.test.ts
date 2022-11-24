import {
  clearAll,
  deleteScope,
  getScope,
  setScope,
  subscribe,
  disable,
  enable,
  isEnabled
} from "../src";
import { describe, test, afterEach, expect } from "vitest";
import { KeyboardEvent } from "happy-dom";

type TriggerEventOptions = { keydown?: boolean; keyup?: boolean };

function triggerKey(
  key: string,
  options: TriggerEventOptions = { keydown: true, keyup: false }
) {
  if (options.keydown) {
    const event: KeyboardEvent = new KeyboardEvent("keydown", { key });
    document.dispatchEvent(event as unknown as Event);
  }
  if (options.keyup) {
    const event = new KeyboardEvent("keyup", { key });
    document.dispatchEvent(event as unknown as Event);
  }
}

afterEach(clearAll);

describe("Subscribe single key", () => {
  test("Test keydown", () =>
    new Promise<void>((resolve) => {
      subscribe("a", (e) => {
        expect(e.key.toLowerCase()).toBe("a");
        resolve();
      });
      triggerKey("a");
    }));

  test("Test keydown", () =>
    new Promise<void>((resolve) => {
      subscribe(
        "c",
        (e) => {
          expect(e.key.toLowerCase()).toBe("c");
          resolve();
        },
        { keydown: true }
      );

      triggerKey("c");
    }));

  test("Test keyup", () =>
    new Promise<void>((resolve) => {
      subscribe(
        "b",
        (e) => {
          expect(e.key.toLowerCase()).toBe("b");
          resolve();
        },
        { keyup: true }
      );

      triggerKey("b", { keydown: true, keyup: true });
    }));
});

describe("Subscribe compose key", () => {
  test("Keydown", () =>
    new Promise<void>((resolve) => {
      subscribe("ctrl+c", (e) => {
        expect(e.key.toLowerCase()).toBe("c");
        resolve();
      });

      triggerKey("Control");
      triggerKey("c");
    }));

  test("keyup", () =>
    new Promise<void>((resolve) => {
      subscribe(
        "ctrl+c",
        (e) => {
          expect(e.key.toLowerCase()).toBe("c");
          resolve();
        },
        { keyup: true }
      );

      triggerKey("Control");
      triggerKey("c", { keydown: true, keyup: true });
    }));

  test("Split", () =>
    new Promise<void>((resolve) => {
      subscribe(
        "ctrl-c",
        (e) => {
          expect(e.key.toLowerCase()).toBe("c");
          resolve();
        },
        { splitValue: "-" }
      );

      triggerKey("Control");
      triggerKey("c");
    }));
});

describe("Subscribe multi key", () => {
  test("Test keydown", () =>
    new Promise<void>((resolve) => {
      subscribe("a,b", (e) => {
        expect(e.key.toLowerCase()).not.toBe("c");
        resolve();
      });

      triggerKey("a");
      triggerKey("b");
      triggerKey("c");
    }));

  test("Test keyup", () =>
    new Promise<void>((resolve) => {
      subscribe(
        "a,b",
        (e) => {
          expect(e.key.toLowerCase()).not.toBe("c");
          resolve();
        },
        { keyup: true }
      );

      triggerKey("a", { keydown: true, keyup: true });
      triggerKey("b", { keydown: true, keyup: true });
      triggerKey("c", { keydown: true, keyup: true });
    }));
});

describe("Scope", () => {
  test("Set scope", () =>
    new Promise<void>((resolve) => {
      subscribe(
        "a",
        (e) => {
          expect(e.key.toLowerCase()).toBe("a");
          resolve();
        },
        { scope: "main" }
      );

      setScope("main");
      triggerKey("a");
    }));

  test("Get scope", () => {
    setScope("main");
    expect(getScope()).toBe("main");
  });

  test("Delete scope", () =>
    new Promise<void>((resolve) => {
      subscribe(
        "a",
        (e) => {
          expect(e.key.toLowerCase()).toBe("a");
          resolve();
        },
        { scope: "default" }
      );

      deleteScope("sub");
      triggerKey("a");
    }));

  test("* scope", () =>
    new Promise<void>((resolve) => {
      let count = 0;
      const func = () => {
        if (count === 2) {
          resolve();
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
    }));
});

describe("Ubsubscribe", () => {
  test("Test keydown", () =>
    new Promise<void>((resolve) => {
      const ubsubscribe = subscribe("a", (e) => {
        expect(e.key.toLowerCase()).toBe("a");
        resolve();
      });

      triggerKey("a");
      expect(ubsubscribe()).toBe(undefined);
    }));
});

describe("Arrow", () => {
  test("ArrowLeft", () =>
    new Promise<void>((resolve) => {
      subscribe("left", (e) => {
        expect(e.key.toLowerCase()).toBe("arrowleft");
        resolve();
      });
      triggerKey("ArrowLeft");
    }));

  test("ArrowRight", () =>
    new Promise<void>((resolve) => {
      subscribe("right", (e) => {
        expect(e.key.toLowerCase()).toBe("arrowright");
        resolve();
      });
      triggerKey("ArrowRight");
    }));

  test("ArrowUp", () =>
    new Promise<void>((resolve) => {
      subscribe("up", (e) => {
        expect(e.key.toLowerCase()).toBe("arrowup");
        resolve();
      });
      triggerKey("ArrowUp");
    }));

  test("ArrowBottom", () =>
    new Promise<void>((resolve) => {
      subscribe("bottom", (e) => {
        expect(e.key.toLowerCase()).toBe("arrowbottom");
        resolve();
      });
      triggerKey("ArrowBottom");
    }));
});

describe("Invalid arguments", () => {
  test("Set wrong scope", () => {
    expect(() => {
      setScope(0 as unknown as string);
    }).toThrow("scope must be string");
  });

  test("Set wrong key", () => {
    expect(() => {
      subscribe(0 as unknown as string, () => {});
    }).toThrow("key must be string");
  });

  test("Set wrong handler", () => {
    expect(() => {
      subscribe("a", null);
    }).toThrow("handler must be function");
  });
});

describe("Valid options", () => {
  test("Options is string", () => {
    return () =>
      new Promise<void>((resolve) => {
        subscribe(
          "space",
          (e) => {
            expect(e.key.toLowerCase()).toBe("space");
            resolve();
          },
          "main"
        );

        setScope("main");
        triggerKey("space");
      });
  });
});

test.only("Test enable", () =>
  new Promise<void>((resolve, reject) => {
    subscribe("a", (e) => {
      expect(e.key.toLowerCase()).toBe("a");
      reject();
    });

    disable();
    expect(isEnabled()).toBe(false);
    triggerKey("a");
    triggerKey("a", { keyup: true });

    setTimeout(() => {
      subscribe("b", () => {
        resolve();
      });
      enable();
      expect(isEnabled()).toBe(true);
      triggerKey("b");
    }, 100);
  }));
