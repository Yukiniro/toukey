# Toukey

![npm](https://img.shields.io/npm/v/toukey)
![GitHub](https://img.shields.io/github/license/yukiniro/toukey)
![npm bundle size](https://img.shields.io/bundlephobia/min/toukey)

`Toukey` is a simple and efficient keyboard events library. That's [toukey's](https://toukey.vercel.app/) doc site.

## Install

```shell
npm i toukey --save
```

or

```shell
pnpm add toukey --save
```

## Use

### Browser

You could download and link **toukey.js** in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/browse/toukey/dist/) | [jsDelivr](https://www.jsdelivr.com/package/npm/toukey)

```javascript
<script src="https://unpkg.com/toukey/dist/toukey.umd.min.js"></script>
<script>
  toukey.subscribe('space', function() {
    console.log('space');
  });
</script>
```

### Basic Use

You will need `Node.js` installed on your system.

```javascript
import { subscribe } from "toukey";

subscribe("scope", () => {
  console.log("scope");
});
```

### Unsubscribe

The `subscribe` interface returns a function that can be called to cancel the current event listener.

```javascript
import { subscribe } from "toukey";

const unsubscribe = subscribe("scope", () => {
  console.log("scope");
});

unsubscribe();
```

It is easy to use with react.

```javascript
import { useEffect } from "react";
import { subscribe } from "toukey";

function App() {
  useEffect(() => {
    return subscribe("scope", () => {
      console.log("scope");
    });
  });

  return <div>hello world</div>;
}
```

And here is a library named [react-toukey-hook](https://github.com/Yukiniro/react-toukey-hook) which build with toukey for react hook.

### Multiple Key

Multiple event listeners can be created at once when using `toukey`.

```javascript
import { subscribe } from "toukey";

subscribe("scope, a", () => {
  console.log("scope or a");
});
```

### Compose key

Through `'+'`, you can monitor the key combination, and you can also customize the key combination separator.

```javascript
import { subscribe } from "toukey";

subscribe("ctrl+a", () => {
  console.log("ctrl+a");
});
```

### Scope

When calling, the third parameter can specify the scope of the event. `"default"` is the default scope.

```javascript
import { subscribe, setScope } from "toukey";

const defaultHandler = () => {
  console.log("scope in default");
};

const subHandler = () => {
  console.log("scope in sub");
};

subscribe("scope", defaultHandler, "default");
subscribe("scope", subHandler, { scope: "sub" });
```

#### setScope

The current effective scope can be set through the `setScope` interface.

```javascript
import { setScope } from "toukey";

setScope("sub");
```

#### getScope

The current effective scope can be obtained through the `getScope` interface.

```javascript
import { getScope } from "toukey";

console.log(getScope());
```

#### deleteScope

The specified scope can be deleted through the `deleteScope` interface.

```javascript
import { deleteScope } from "toukey";

deleteScope("main");
```

#### Special scope \*

If `scope` is specified as `"*"`, the listener function will ignore the `scope` setting.

```javascript
import { subscribe, setScope } from "toukey";

const handler = () => {
  console.log("scope in default");
};

const subHandler = () => {
  console.log("scope in sub");
};

subscribe("scope", defaultHandler, "*");
subscribe("scope", subHandler, "sub");
setScope("sub");
```

### keydown and keyup

You can set the type for handler call.

```javascript
import { subscribe, setScope } from 'toukey';

const downHandler = () => {
  console.log('scope keydown');
};

const upHandler = () => {
  console.log('scope keyup');
};

subscribe('scope', downHandler, {'keydown'});
subscribe('scope', upHandler, {'keyup'});
```

### clearAll

You could clear all listeners by the `clearAll()`

```javascript
import { clearAll } from "toukey";

clearAll();
```

### enable

You could enable all listeners if the toukey is not enabled.

```javascript
import { enable } from "toukey";

enable();
```

### disable

You could disable all listeners.

```javascript
import { enable } from "toukey";

enable();
```

### isEnabled

All listeners will be invalid if the `isEnabled` returns false.

```javascript
import { enable } from "toukey";

console.log(isEnabled());
```
